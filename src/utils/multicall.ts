import { config as wagmiConfig } from '@/config/wagmi';
import { readContracts } from 'wagmi/actions';
import { Abi, Address } from 'viem';
import { ChainId } from '@/config/constants';

export interface MulticallParams {
    calls: string[];
    contract: Address;
    chainId: ChainId;
    abi: Abi;
    blockNumber?: bigint;
}

type Contract = {
    address: Address;
    abi: Abi;
    functionName: string;
    chainId: ChainId;
    args: unknown[];
    blockNumber?: bigint;
};

const prepareArgs = (str: string) => {
    if (!str || str === '' || str === 'undefined') {
        return [];
    }

    if (str.includes('n')) {
        return [BigInt(str.replace('n', ''))];
    }

    return str.split(',');
};

// Split the string by the colon
// str[0] - returning key name
// str[1] - function name to call
// str[2] - arguments to pass to the function
const getParams = (str: string) => {
    let tmp = str;

    if (!str || str === '') return null;

    const key = str.includes('-') ? str.split('-')[0] : null;

    if (key) tmp = str.replace(`${key}-`, '');

    const params = tmp.split(':');

    if (params.length === 1) {
        return { key, functionName: params[0], args: [] };
    }

    return { key, functionName: params[0], args: prepareArgs(params[1]) };
};

export const multicall = async ({ calls, contract, chainId, abi, blockNumber }: MulticallParams) => {
    const results = {} as { [key: string]: unknown };
    const contracts = [] as Contract[] as any;

    try {
        for (let i = 0; i < calls.length; i++) {
            const params = getParams(calls[i]);
            if (!params) continue;

            const { functionName, args } = params;
            const call = { address: contract, abi, functionName, chainId, args } as Contract;

            if (blockNumber) call.blockNumber = blockNumber;

            contracts.push(call);
        }

        const data = await readContracts(wagmiConfig, { contracts });

        for (let i = 0; i < calls.length; i++) {
            const params = getParams(calls[i]);
            if (!params) continue;

            results[params.key ? params.key : calls[i]] = data[i].result;
        }

        return results;
    } catch (error) {
        console.error('Failed to fetch data', error);
        return results;
    }
};
