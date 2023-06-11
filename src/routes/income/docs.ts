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
 *   - name: Incomes
 *     description: income Related Apis
 */

/**
 * @swagger
 * /incomes/order/{id}:
 *   get:
 *     tags: [Incomes]
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
 * /incomes:
 *   get:
 *     tags: [Incomes]
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
 * /incomes/user:
 *   get:
 *     tags: [Incomes]
 *     summary: Returns all incomes of a  user
 *     description: Returns all incomes of a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
 *       - $ref: "#/components/parameters/idQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 incomes:
 *                   $ref: "#/components/schemas/ShareHolderIncome"
 *                 incomesCount:
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
 *       404:
 *         description: not found
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
 * /incomes/company:
 *   get:
 *     tags: [Incomes]
 *     summary: Returns all incomes of a  company
 *     description: Returns all incomes of a company
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
 *                 incomes:
 *                   $ref: "#/components/schemas/ShareHolderIncome"
 *                 incomesCount:
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
 *       404:
 *         description: not found
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
 * /incomes/total:
 *   get:
 *     tags: [Incomes]
 *     summary: Returns total income of all users of a company
 *     description: Returns total income of all users of a company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/fromDateQuery"
 *       - $ref: "#/components/parameters/toDateQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: string
 *             example:
 *               totalIncome: "2000"
 *
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
 * /incomes/user/total:
 *   get:
 *     tags: [Incomes]
 *     summary: Returns total income of a user or company
 *     description: Returns total income of a user or company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/fromDateQuery"
 *       - $ref: "#/components/parameters/toDateQuery"
 *       - $ref: "#/components/parameters/forUserQuery"
 *       - $ref: "#/components/parameters/onlyNotSettledQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: string
 *             example:
 *               totalIncome: "2000"
 *
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
