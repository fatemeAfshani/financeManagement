/**
 * @swagger
 * components:
 *   schemas:
 *     ShareHolderIncome:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         companyId:
 *           type: number
 *         orderId:
 *           type: number
 *         userId:
 *           type: number
 *         sharePercent:
 *           type: number
 *         amount:
 *           type: number
 *         date:
 *           type: string
 *         isCompanyIncome:
 *           type: boolean
 *         isSettled:
 *           type: boolean
 *         checkoutDate:
 *           type: string
 *         checkoutId:
 *           type: number
 *
 *       example:
 *         id: 1
 *         companyId: 1
 *         orderId: 1
 *         userId: 1
 *         sharePercent: 20
 *         amount: 200
 *         date: "020215"
 *         isCompanyIncome: false
 *         isSettled: false
 */

/**
 * @swagger
 * tags:
 *   - name: ShareHolders
 *     description: Share holders Related Apis
 */

/**
 * @swagger
 * /shareHolders:
 *   post:
 *     tags: [ShareHolders]
 *     summary: add or update shareHolders
 *     description: add or update shareHolders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   isShareHolder:
 *                     type: boolean
 *                   sharePercent:
 *                     type: number
 *
 *             required:
 *               - users
 *
 *             example:
 *               users: [{id: 1 , isShareHolder: true , sharePercent: 20}]
 *
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
 * /shareHolders/order/{id}:
 *   get:
 *     tags: [ShareHolders]
 *     summary: Returns incomes of users for one order
 *     description: Returns incomes of users for one order
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
 *               $ref: "#/components/schemas/ShareHolderIncome"
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
 * /shareHolders:
 *   get:
 *     tags: [ShareHolders]
 *     summary: Returns all incomes of users for a company
 *     description: Returns all incomes of users for a company
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
 *               $ref: "#/components/schemas/ShareHolderIncome"
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
 * /orders/product/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Returns orders of one product
 *     description: Returns all of orders for one product
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
 *               $ref: "#/components/schemas/Order"
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
