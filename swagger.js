const swaggerAutogen = require('swagger-autogen)')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: 'https://project-portfolio-8g80.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);