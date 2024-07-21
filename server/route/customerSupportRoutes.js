const express = require('express');
const router = express.Router();
const customerSupportController = require('../controller/customerSupportController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerSupport:
 *       type: object
 *       required:
 *         - user_id
 *         - issue_type
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated support request id
 *         user_id:
 *           type: string
 *           description: The user ID making the support request
 *         issue_type:
 *           type: string
 *           description: Type of issue (Technical, Billing, General)
 *         description:
 *           type: string
 *           description: Description of the issue
 *         status:
 *           type: string
 *           description: Status of the request (Pending, In Progress, Resolved)
 *       example:
 *         id: 1
 *         user_id: 0107096245082
 *         issue_type: Technical
 *         description: Unable to access account
 *         status: Pending
 */

/**
 * @swagger
 * /api/support:
 *   post:
 *     summary: Create a new support request
 *     tags: [Customer Support]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerSupport'
 *     responses:
 *       201:
 *         description: Support request created successfully
 *       500:
 *         description: Server error
 */
router.post('/', customerSupportController.createSupportRequest);

/**
 * @swagger
 * /api/support:
 *   get:
 *     summary: Get all support requests
 *     tags: [Customer Support]
 *     responses:
 *       200:
 *         description: List of support requests
 *       500:
 *         description: Server error
 */
router.get('/', customerSupportController.getSupportRequests);

/**
 * @swagger
 * /api/support/{id}:
 *   get:
 *     summary: Get a support request by ID
 *     tags: [Customer Support]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The support request ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Support request details
 *       404:
 *         description: Support request not found
 *       500:
 *         description: Server error
 */
router.get('/:id', customerSupportController.getSupportRequest);

/**
 * @swagger
 * /api/support/{id}:
 *   put:
 *     summary: Update a support request by ID
 *     tags: [Customer Support]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The support request ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerSupport'
 *     responses:
 *       200:
 *         description: Support request updated successfully
 *       404:
 *         description: Support request not found
 *       500:
 *         description: Server error
 */
router.put('/:id', customerSupportController.updateSupportRequest);

/**
 * @swagger
 * /api/support/{id}:
 *   delete:
 *     summary: Delete a support request by ID
 *     tags: [Customer Support]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The support request ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Support request deleted successfully
 *       404:
 *         description: Support request not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', customerSupportController.deleteSupportRequest);

module.exports = router;
