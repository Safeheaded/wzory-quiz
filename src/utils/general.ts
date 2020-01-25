import process from 'process';
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const development: boolean =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function isDev(): boolean {
    return development;
}

export function getParams<T extends object>(params: object): T {
    return params as T;
}
