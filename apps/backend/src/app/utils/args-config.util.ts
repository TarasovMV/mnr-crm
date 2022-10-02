export function argsConfig<T>(key: string): T {
    const args = process.argv.slice(2);
    const config = args.reduce((cur, next) => {
        const arg = next.split('=');
        return {...cur, [arg[0]]: arg[1]};
    }, {});

    return config?.[key] || undefined
}
