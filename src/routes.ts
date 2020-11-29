import { wrap } from 'svelte-spa-router/wrap';
import Home from './views/Home.svelte';
import Login from './views/Login.svelte';
import NotFound from './views/NotFound.svelte';
import NotPermitted from './views/NotPermitted.svelte';

import { Global } from './services/Global';
import { replace } from "svelte-spa-router";

export default {
    '/': wrap({
        component: Login,
    }),
    '/home': wrap({
        component: Home,
        conditions: [
            async () => {
                return new Promise( async (resolve) => {
                    Global.loadingPage.set(true);
                    setTimeout(() => {
                        Global.loadingPage.set(false);
                        if (!Global.isLoggedIn) {
                            resolve(false);
                            replace('/not_permitted');
                        }
                        resolve(true);
                    }, 2000);
                });
            }
        ]
    }),
    '/not_permitted': wrap({
        component: NotPermitted
    }),
    '*': wrap({
        component: NotFound
    }),
};
