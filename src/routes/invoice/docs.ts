/**
 * @swagger
 * components:
 *   schemas:
 *
 *     ProductInvoice:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *         pricePerOne:
 *           type: number
 *         amount:
 *           type: number
 *         date:
 *           type: string
 *         companyId:
 *           type: number
 *         id:
 *           type: number
 *       example:
 *         productId: 1
 *         pricePerOne: 20.00
 *         amount: 10
 *         companyId: 1
 *         date: "1402/01/25 12:03:30"
 *
 */

/**
 * @swagger
 * tags:
 *   - name: Invoices
 *     description: product-invoice Related Apis
 */

/**
 * @swagger
 * /invoices:
 *   post:
 *     tags: [Invoices]
 *     summary: new product invoice
 *     description: add new product invoice and update product stock
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *               pricePerOne:
 *                 type: number
 *               amount:
 *                 type: number
 *             required:
 *               - productId
 *               - pricePerOne
 *               - amount
 *           example:
 *             productId: 1
 *             pricePerOne: 30
 *             amount: 20
 *     responses:
 *       200:
 *         description: Successful
 *       401:
 *         description: unAuthorized
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */

/**
 * @swagger
 * /invoices/product/{id}:
 *   get:
 *     tags: [Invoices]
 *     summary: Returns invoices of one product
 *     description: Returns all of inovices for one product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoices:
 *                   $ref: "#/components/schemas/ProductInvoice"
 *                 invoicesCount:
 *                   type: number
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: unAuthorized
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     tags: [Invoices]
 *     summary: Returns one invoice
 *     description: Returns data of one invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductInvoice"
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: unAuthorized
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     tags: [Invoices]
 *     summary: Returns all of invoices
 *     description: Returns all invoices of a company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoices:
 *                   productId:
 *                     type: string
 *                   pricePerOne:
 *                     type: number
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                   name:
 *                     type: string
 *                   id:
 *                     type: number
 *                 invoicesCount:
 *                   type: number
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: unAuthorized
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
