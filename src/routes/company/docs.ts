/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *         sharePercent:
 *           type: number
 *         code:
 *           type: string
 *       example:
 *         name: "company"
 *         sharePercent: 10
 *         id: 1
 *         createdAt: "020123"
 *         code: "3618bc6e-e659-490d-bc97-2a196b690737"
 *
 */

/**
 * @swagger
 * tags:
 *   - name: Company
 *     description: Company Related Apis
 */

/**
 * @swagger
 * /company:
 *   get:
 *     tags: [Company]
 *     summary: Returns compnay data
 *     description: Returns compnay data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Company"

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
 *         description: Not Found
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
