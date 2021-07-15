import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import quoteArray from './quotem.js';

// import { readFile } from 'fs/promises';

// const json = JSON.parse(
//   await readFile(
//     new URL('./quotes.json', import.meta.url)
//   )
// );

const fastify = Fastify({ logger: true });

const port = process.env.PORT || '3000';

fastify.register(fastifyCors, { 
    // put your options here
});

fastify.get('/quote/random', async (request, reply) => {
    const randomnum = Math.ceil(Math.random() * quoteArray.length);
    const quote = { "quote": quoteArray[randomnum] };
    return quote;
});

fastify.get('/quote/:number', async (request, reply) => {
    const num = request.params.number || 0;
    const quote = { "quote": quoteArray[num] };
    return quote;
});

const start = async () => {
    try {
        await fastify.listen(port, '0.0.0.0');
    } catch(err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
