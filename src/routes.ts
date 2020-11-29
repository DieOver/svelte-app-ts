import { wrap } from 'svelte-spa-router/wrap';
import Home from './views/Home.svelte';
import Lorem from './views/Lorem.svelte';
import NotFound from './views/NotFound.svelte';

import { Global } from './services/Global';

export default {
    '/': wrap({
        component: Home,
    }),
    '/lorem/:repeat': wrap({
        component: Lorem,
        conditions: [
            async (detail) => {
                return new Promise((resolve, reject) => {
                    Global.name.set('Searching...');
                    fetch('https://jsonplaceholder.typicode.com/todos/1').then(async (response) => {
                        const data = await response.json();
                        if (data.userId) {
                            Global.name.set(data.title);
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }, (error) => {
                        console.error('Falha ao buscar usuário:', error);
                        resolve(false);
                    });
                });
            }
        ]
    }),
    '*': wrap({
        component: NotFound
    }),
};
