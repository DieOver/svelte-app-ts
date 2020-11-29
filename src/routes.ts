import { wrap } from 'svelte-spa-router/wrap';
import Home from './views/Home.svelte';
import Login from './views/Login.svelte';
import NotFound from './views/NotFound.svelte';
import NotPermitted from './views/NotPermitted.svelte';

import { Global } from './services/Global';
import { replace } from "svelte-spa-router";

export default {
    '/': Login,
    '/not_permitted': NotPermitted,
    '/home': wrap({
        component: Home,
        conditions: [
            async () => new Promise(async (resolve) => {
                Global.loadingPage.set(true);
                setTimeout(() => {
                    Global.loadingPage.set(false);
                    if (!Global.isLoggedIn) {
                        resolve(false);
                        replace('/not_permitted');
                    }
                    resolve(true);
                }, 2000);
            })
        ]
    }),
    '*': NotFound
};
