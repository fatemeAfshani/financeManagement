/**
 * @swagger
 * tags:
 *   - name: Cookies
 *     description: cookies Related Apis
 */

/**
 * @swagger
 * /cookies:
 *   post:
 *     tags: [Cookies]
 *     summary: add cookie
 *     description: add language to cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lang:
 *                 type: string
 *
 *           example:
 *             lang: "fa"
 *
 *     responses:
 *       200:
 *         description: Successful
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
