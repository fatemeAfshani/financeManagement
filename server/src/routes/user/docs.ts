/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         companyId:
 *           type: number
 *         id:
 *           type: number
 *         role:
 *           type: string
 *         isShareHolder:
 *           type: boolean
 *         sharePercent:
 *           type: number
 *       example:
 *         username: "fateme"
 *         role: 'admin'
 *         id: 1
 *         companyId: 1
 *         isShareHolder: true
 *         sharePercent: 10
 *
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
 *               code:
 *                 type: string
 *                 description: company unique code if company Already exists
 *               companyName:
 *                 type: string
 *                 description: name of the company if it is new
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: "fateme"
 *             password: "123456"
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
 *                 role:
 *                   type: string
 *             example:
 *               username: "fateme"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
 *               role: "admin"
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

/**
 * @swagger
 * /users/company:
 *   get:
 *     tags: [Users]
 *     summary: Returns all users of a company
 *     description: Returns all users of a company
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
 *                 users:
 *                   $ref: "#/components/schemas/User"
 *                 company:
 *                   $ref: "#/components/schemas/Company"

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
 * /users/shareholder:
 *   post:
 *     tags: [Users]
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
 * /users/update:
 *   post:
 *     tags: [Users]
 *     summary: update role and/or username of a user
 *     description:  update role and/or username of a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             users:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *
 *
 *             example:
 *               id: 1
 *               username: "newName"
 *               role: "admin"
 *
 *     responses:
 *       200:
 *         description: Successful

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
 *       403:
 *         description: forbbiden
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
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: update role and/or username of a user
 *     description:  update role and/or username of a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"

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
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: delete a user
 *     description:  delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: unAuthorized
 *       404:
 *         description: not found
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
