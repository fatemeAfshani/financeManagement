/**
 * @swagger
 * components:
 *   schemas:
 *     ShareHolderCheckout:
 *       type: object
 *       properties:
 *         companyId:
 *           type: number
 *         amount:
 *           type: number
 *         description:
 *           type: string
 *         userId:
 *           type: number
 *         date:
 *           type: string
 *         id:
 *           type: number
 *       example:
 *         id: 1
 *         comapnyId: 1
 *         amount: 221
 *         description: "this is just test"
 *         userId: 1
 *         date: "020216"
 */

/**
 * @swagger
 * tags:
 *   - name: Checkouts
 *     description: shareholder checkout Related Apis
 */

/**
 * @swagger
 * /checkouts:
 *   post:
 *     tags: [Checkouts]
 *     summary: new checkout
 *     description: add new checkout
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               userId:
 *                 type: number
 *               incomeIds:
 *                 type: array
 *                 items:
 *                   type: number
 *             required:
 *               - amount
 *               - description
 *               - incomeIds
 *
 *             example:
 *               amount: 349.95
 *               description: "test description"
 *               userId: 1
 *               incomeIds: [12]
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: number
 *             example:
 *               orderId: 1
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
 * /checkouts/checkout/{id}:
 *   get:
 *     tags: [Checkouts]
 *     summary: Returns one checkout
 *     description: Returns data of one checkout
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
 *               $ref: "#/components/schemas/ShareHolderCheckout"
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
 * /checkouts:
 *   get:
 *     tags: [Checkouts]
 *     summary: Returns all of checkouts
 *     description: Returns all checkouts of a company
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
 *                 checkouts:
 *                   $ref: "#/components/schemas/ShareHolderCheckout"
 *                 checkoutsCount:
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
 * /checkouts/user:
 *   get:
 *     tags: [Checkouts]
 *     summary: Returns all checkouts of a user
 *     description: Returns all checkouts of a user
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
 *                 checkouts:
 *                   $ref: "#/components/schemas/ShareHolderCheckout"
 *                 checkoutsCount:
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
