const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title:'My API Roguin for Vehicles',
        description:'Vehicles API'
    },
    host: 'localhost:8080',
    schemes:['http']
}; 

const outFile = './swagger.json';
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outFile, endpointFiles, doc)