import { GetUserQuery } from '@/graphql/queries/GetUserQuery';
import { managers, migrations } from '@/config/contracts';
import { Address, erc20Abi } from 'viem';
import { getGraphClient } from '@/config/graph';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RefetchInterval } from '@/config/constants';
import { ContractCall, IProfile, IToken, IUser } from '@/types/tournament';
import { getPointsByUser } from '@/utils/user';
import { Token, Tournament } from '@/generated/types';
import { managerAbi } from '@/config/abis';
import { readContracts } from 'wagmi/actions';
import { config as wagmiConfig } from '@/config/wagmi';
import { GetTokensQuery } from '@/graphql/queries/GetTokensQuery';
import { getTournamentTokens } from '@/utils';
import { GetMigrationInfoProps, GetTokensDeployedProps, GetTokensOwnedProps, GetWinnersTokensProps, ProfileQueryProps } from '@/types/profile';

const getWinnersTokens = async ({ address, chainId, tournaments }: GetWinnersTokensProps): Promise<IToken[]> => {
    const managerAddr = managers[chainId];
    const graphClient = getGraphClient(chainId);

    const contracts = tournaments.map((tournament) => {
        return { address: managerAddr, abi: managerAbi, chainId, functionName: 'getWinningToken', args: [BigInt(tournament.id)] };
    }) as ContractCall<[bigint]>[];

    const winnersResult = (await readContracts(wagmiConfig, { contracts })).filter(({ result }) => result);
    const winnersAddresses = winnersResult.map(({ result }) => String(result).toLowerCase());

    const { data: winnersTokens } = await graphClient.query<{ tokens: Token[] }>({ query: GetTokensQuery, variables: { ids: winnersAddresses } });
    if (!winnersTokens?.tokens) return [];

    const winnersWithBalance = await getTournamentTokens({ tokens: winnersTokens.tokens, chainId, address });
    const tokens = winnersWithBalance.filter((token) => token.balanceRaw > 0n);

    return await getMigrationInfo({ tokens, chainId, address });
};

// Getting the migration info (allowance, balance and address) for each token
const getMigrationInfo = async ({ tokens, chainId, address }: GetMigrationInfoProps) => {
    const managerAddr = managers[chainId];
    const migrationAddr = migrations[chainId];

    const migrationAddressesContracts = tokens.map((token) => {
        return { address: managerAddr, abi: managerAbi, functionName: 'tournamentMigrationWinners', args: [BigInt(token.tournamentId)], chainId };
    }) as ContractCall<[bigint]>[];

    const migrationAddresses = await readContracts(wagmiConfig, { contracts: migrationAddressesContracts });

    // add migration address to token
    const tokensWithMigrationAddress = tokens.map((token, index) => {
        const migrationAddress = migrationAddresses[index].result as Address;
        return { ...token, migrationAddress };
    });

    const contracts = tokensWithMigrationAddress
        .map((token) => {
            return [
                { address: token.migrationAddress, abi: erc20Abi, functionName: 'balanceOf', args: [address] } as ContractCall<[Address]>,
                { address: token.address, abi: erc20Abi, functionName: 'allowance', args: [address, migrationAddr] } as ContractCall<[Address, Address]>,
            ];
        })
        .flat();

    const results = await readContracts(wagmiConfig, { contracts });

    // add balance and allowance to token instance
    return tokensWithMigrationAddress.map((token, index) => {
        const migrationBalance = results[index * 2].result as bigint;
        const migrationAllowance = results[index * 2 + 1].result as bigint;
        return { ...token, migrationBalance, migrationAllowance };
    });
};

const getTokensOwned = async ({ address, chainId, tournamentTokens, tournaments }: GetTokensOwnedProps) => {
    const winnersTokens = await getWinnersTokens({ address, chainId, tournaments });
    const sortedTournamentTokens = tournamentTokens
        .sort((a, b) => b.balanceUsd - a.balanceUsd)
        .sort((a, b) => Number(b.isAvailable) - Number(a.isAvailable))
        .filter((token) => token.balanceRaw > 0n);
    return [...winnersTokens, ...sortedTournamentTokens];
};

const getTokensDeployed = ({ listings, delistings, tournamentId }: GetTokensDeployedProps) => {
    // tokens not part of a tournament
    const unlistedTokens = listings.filter((token) => !token.tournament);

    // check if unlisted tokens are available to claim (check if not included in already delisted tokens)
    const tokensCanClaim = unlistedTokens.filter((token) => !delistings.find((delisted) => delisted.id === token.id));

    // change the 'isCanClaim' and 'isClaimed' properties for tokens that can be claimed
    const tokensList = listings.map((token) => {
        const isCanClaim = !!tokensCanClaim.find((claimable) => claimable.id === token.id);
        const isClaimed = !!delistings.find((delisted) => delisted.id === token.id);
        const isIncoming = +token.tournamentId > +tournamentId;
        return { ...token, isCanClaim, isClaimed, isIncoming };
    });

    return tokensList.sort((a, b) => Number(b.isCanClaim) - Number(a.isCanClaim)).sort((a, b) => Number(b.isClaimed) - Number(a.isClaimed));
};

const queryFn = async ({ chainId, address, tournament }: ProfileQueryProps): Promise<IProfile | null> => {
    const userAddr = String(address).toLowerCase();
    const graphClient = getGraphClient(chainId);

    try {
        const { data } = await graphClient.query<{ user: IUser; tournaments: Tournament[] }>({ query: GetUserQuery, variables: { id: userAddr } });
        if (!data?.user || !data?.tournaments) return null;

        const points = getPointsByUser(data.user);

        const listings = data.user.listings?.map((listing) => listing.token) || [];
        const delistings = data.user.delistings?.map((delisting) => delisting.token) || [];
        const tournamentIds = data.tournaments.map((tournament) => tournament.id).reverse();
        const tournamentId = tournamentIds[0];
        const tournamentTokens = tournament?.tokens || [];

        const tokensOwned = await getTokensOwned({ address, chainId, tournamentTokens, tournaments: data.tournaments });
        const tokensDeployed = getTokensDeployed({ listings, delistings, tournamentId });

        return { user: data.user, points, tokensOwned, tokensDeployed };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const useProfile = (props: ProfileQueryProps) => {
    return useQuery({
        queryKey: ['use-profile', props.address, props.chainId, props.tournament?.id],
        queryFn: () => queryFn(props),
        enabled: !!props.address,
        refetchInterval: RefetchInterval.FAST,
        placeholderData: keepPreviousData,
    });
};
