/*       _          _             _                            
//      | |   _   _| |_ __ _ _ __(_) __ _   
//      | |  | | | | __/ _` | '__| |/ _` |  
//      | |__| |_| | || (_| | |  | | (_| | 
//      |_____\__,_|\__\__,_|_|  |_|\__,_|.COM
// ==================================================
*/                                          

//  IMPORTS
const express = require('express');
const sequelize = require('./config/database');
// rotas  --------------------------------------- +
const personaRoutes = require('./routes/personaRoutes');
// ---------------------------------------------- +++
// swagger -------------------------------------- +
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// ---------------------------------------------- +++

// SYNC com o DB
sequelize.sync({ alter: true }).then(() => {
    console.log('Tabelas sincronizadaas com sucesso!');
}).catch((error) => {
    console.log('Erro de sincronizacao... ', error);
});

// APP
const app = express();
app.use(express.json());

// ROTAS
// retornando uma pagina index.html
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Api funcionando!' });
});
app.use('/v1/api', personaRoutes); // Prefixo para as rotas da API

// SWAGGER
// config do swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Lutaria.com',
            version: '1.0.0',
            description: "Sobreviva no 1x1 contra figuras historicas"
        },
        servers: [
        {
            url: 'https://localhost:3000/',
            description: 'Servidor Local'
        }
        ]
    },
    apis: ['./controllers/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// MIDDLEWARE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado... ');
});

//middleware swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;