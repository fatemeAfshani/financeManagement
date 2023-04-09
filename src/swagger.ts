import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'finance',
      version: '1.0.0',
      description: 'Finance managment application',
    },
  },
  apis: [
    './src/routes/product/docs.ts',
    // './src/routes/subscription/*.js',
    // './src/routes/invoice/*.js',
  ],
}

export default swaggerJsdoc(options)
