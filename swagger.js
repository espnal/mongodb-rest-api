const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title:'My API Roguin for Vehicles',
        description:'Vehicles API'
    },
    host: 'mongodb-rest-api.onrender.com',
    schemes:['https']
}; 

const outFile = './swagger.json';
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outFile, endpointFiles, doc)