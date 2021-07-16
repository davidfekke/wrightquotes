import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import path from 'path';
import fastifyStatic from 'fastify-static';
import fastifySwagger from 'fastify-swagger';
import quoteArray from './quotem.js';

const fastify = Fastify({ logger: true });

const port = process.env.PORT || '3000';

const __dirname = process.cwd();

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/', // optional: default '/'
});


fastify.register(fastifySwagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Wright Quote swagger',
        description: 'These are the API calls for the Wright Quote service',
        version: '0.1.0'
      },
      host: 'wrightquotes.herokuapp.com',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'quote', description: 'Quote related end-points' }
      ],
      definitions: {
        Quote: {
          type: 'object',
          required: ['quote'],
          properties: {
            quote: { type: 'string' }
          }
        }
      }
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
  });

fastify.register(fastifyCors, { 
    // put your options here
});

fastify.get('/quote/random', {
        schema: {
            description: 'get a random quote',
            response: {
            200: {
                description: 'Successful response',
                type: 'object',
                properties: {
                quote: { type: 'string' }
                }
            }
            },
        }
    },
    async (request, reply) => {
    const randomnum = Math.floor(Math.random() * quoteArray.length);
    const quote = { "quote": quoteArray[randomnum] };
    return quote;
});

fastify.get('/quote/:number', {
        schema: {
            description: 'get a specific quote',
            params: {
            type: 'object',
            properties: {
                number: {
                type: 'number',
                description: 'Number of quote'
                }
            }
            },
            response: {
            200: {
                description: 'Successful response',
                type: 'object',
                properties: {
                quote: { type: 'string' }
                }
            }
            },
        }
    },
    async (request, reply) => {
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


