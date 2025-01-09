import { expect, test } from 'vitest';
import { ChainId } from '@/config/constants';
import { LaunchFormArgs } from '@/app/launcher/types';
import { launchpadAbi } from '@/config/abis';
import { launchpads } from '@/config/contracts';
import { simulateContract } from 'viem/actions';

import { getViemPublicClient } from '@/config/wagmi';

const PLACEHOLDER_IMAGE = 'https://placehold.co/200x200';

test('simulating token addresses', async () => {
    const client = getViemPublicClient({ chainId: ChainId.ARBITRUM });

    const formData = {
        name: 'Token',
        symbol: 'TNT',
        websiteUrl: '',
        imageUrl: '',
        description: '',
        chatUrl: '',
        socialUrl: '',
        donation: '1',
    };

    const simulationPrepared = structuredClone(formData);
    simulationPrepared.imageUrl = PLACEHOLDER_IMAGE;

    const simulationArgs = Object.values(simulationPrepared) as LaunchFormArgs;
    simulationArgs[simulationArgs.length - 1] = BigInt(simulationPrepared.donation || 0);

    const simulationParams = {
        args: [...simulationArgs],
        abi: launchpadAbi,
        address: launchpads[ChainId.ARBITRUM],
        functionName: 'listing',
        value: 10000n,
    } as const;

    const promises = [await simulateContract(client, { ...simulationParams }), await simulateContract(client, { ...simulationParams })];

    const results = await Promise.all(promises);

    const data = results.map((result) => result.result);
    console.log({ data });

    expect(results).toHaveLength(2);
});
