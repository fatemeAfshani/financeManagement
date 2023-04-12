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
    './src/routes/invoice/docs.ts',
    './src/routes/user/docs.ts',
  ],
}

export default swaggerJsdoc(options)
