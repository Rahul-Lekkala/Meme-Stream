
const swaggerOptions = {
      definition: {
          openapi: '3.0.0',
          info:{
              title: 'XMeme',
              description: 'Stream the Memes',
              version: '1.0.0', 
          },
          servers: [
              {
              url: process.env.BACKEND_API
          }
      ]
          
      },
      apis: ['*.js']
}

module.exports = swaggerOptions;