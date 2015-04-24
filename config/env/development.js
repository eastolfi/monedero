'use strict';

module.exports = {
    /*db: "mongodb://admin:admin@kahana.mongohq.com:10074/monedero-db",*/
	db: "mongodb://localhost:27017/monedero-db",
    app: {
        name: "Quinielas Antonio - Built with MeanIO - Development"
    },
    facebook: {
        clientID: "528925517152643",
        clientSecret: "e10acb8f1fe4e0f7316d8c02b86211fb",
        callbackURL: "https://masajes-mean-c9-eastolfi.c9.io/auth/facebook/callback"
    },
    twitter: {
        clientID: "xkDruXUHTCt5XBfzDW3A",
        clientSecret: "HJkXl6xcobxJEPumHbvs5THG77UJ5JzPfnblwLzCVPQ",
        callbackURL: "https://masajes-mean-c9-eastolfi.c9.io/auth/twitter/callback"
    },
    github: {
        clientID: "a59b17ce0213bf2fce1b",
        clientSecret: "1ac55608fe847fc1e094dee4d242700b61842a91",
        callbackURL: "https://masajes-mean-c9-eastolfi.c9.io/auth/github/callback"
    },
    google: {
        clientID: "386243945090-hmc2q10lpahjgn96lm6rt11uff7uvmc3.apps.googleusercontent.com",
        clientSecret: "zA6MkVQxrvNXKXXxYvvh0zI-",
        callbackURL: "https://masajes-mean-c9-eastolfi.c9.io/auth/google/callback"
    },
    linkedin: {
        clientID: "77opk0x9ab0pee",
        clientSecret: "TnE1uNIHDNDz87yQ",
        callbackURL: "https://masajes-mean-c9-eastolfi.c9.io/auth/linkedin/callback"
    }
}