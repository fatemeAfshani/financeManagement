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
    './src/routes/user/docs.ts',
    './src/routes/product/docs.ts',
    './src/routes/invoice/docs.ts',
    './src/routes/stock/docs.ts',
    './src/routes/order/docs.ts',
    './src/routes/income/docs.ts',
    './src/routes/checkout/docs.ts',
    './src/routes/cookie/docs.ts',
  ],
}

export default swaggerJsdoc(options)
