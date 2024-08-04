function getEnv(name: string) {
    return import.meta.env[name];
}

export { getEnv };
