import process from 'process';
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function isDev(): boolean {
    const development: boolean =
        !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    return development;
}

export function getParams<T extends object>(params: object): T {
    return params as T;
}
