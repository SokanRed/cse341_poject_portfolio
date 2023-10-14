const swaggerAutogen = require('swagger-autogen)')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: 'https://sokanred-project-portfolio.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);