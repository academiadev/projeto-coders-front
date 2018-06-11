export const environment = {
    production: false,
    backEndUrl: 'http://localhost:8080',
    tokenName: 'access_token',
    urls: {
        auth: {
            login: 'http://localhost:8080/login',
            refresh: 'http://localhost:8080/refresh',
        },
        empresa: {
            url: 'http://localhost:8080/empresa'
        }
    }
};
