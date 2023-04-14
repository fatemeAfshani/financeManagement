/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: number
 *         companyId:
 *           type: number
 *         companyName:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         username: "fateme"
 *         password: "123dd2"
 *         role: 'admin'
 *         id: 1
 *         companyId: 1
 *
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: user Related Apis
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: create new user
 *     description: user registration and if needed creates new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password must be min 6 character
 *               companyId:
 *                 type: number
 *                 description: id of company if company Already exists
 *               companyName:
 *                 type: string
 *                 description: name of the company if it is new
 *               role:
 *                 type: string
 *                 description: user role in company whitch can be admin or viewer
 *             required:
 *               - username
 *               - password
 *               - role
 *           example:
 *             username: "fateme"
 *             password: "123456"
 *             role: admin
 *             companyName: "sample name"
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 companyId:
 *                   type: number
 *             example:
 *               username: "fateme"
 *               companyId: 20
 *
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
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Returns username and token
 *     description: user login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password must be min 3 character
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: "fateme"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               username: "fateme"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: Authorization information is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "invalid login"
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
