/**
 * @swagger
 * tags:
 *   - name: ChartData
 *     description: Apis for dashboard's chart
 */

/**
 * @swagger
 * /chart/user:
 *   get:
 *     tags: [ChartData]
 *     summary: get total income of user
 *     description: get total income of user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                 totalIncomeNotSettled:
 *                   type: number
 *             example:
 *               totalIncome: 10
 *               totalIncomeNotSettled: 6
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
 * /chart/company:
 *   get:
 *     tags: [ChartData]
 *     summary: get total income of company
 *     description: get total income of company
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                 totalIncomeNotSettled:
 *                   type: number
 *                 companyTotalIncome:
 *                   type: number
 *                 companyTotalIncomeNotSettled:
 *                   type: number
 *             example:
 *               totalIncome: 10
 *               totalIncomeNotSettled: 6
 *               companyTotalIncome: 5
 *               companyTotalIncomeNotSettled: 3
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
 * /chart/total:
 *   get:
 *     tags: [ChartData]
 *     summary: get total number of products/users/orders/invoices
 *     description: get total incomeproducts/users/orders/invoices
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProducts:
 *                   type: number
 *                 totalOrders:
 *                   type: number
 *                 totalUsers:
 *                   type: number
 *                 totalInvoices:
 *                   type: number
 *             example:
 *               totalProducts: 10
 *               totalUsers: 6
 *               totalInvoices: 60
 *               totalOrders: 600
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
