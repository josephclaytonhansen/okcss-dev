import express from 'express'
const router = express.Router()


import { getHighCouncilEmails, deleteHighCouncilEmail, createHighCouncilEmail } from '../controllers/highCouncilEmailController.js'

router.route('/').get(getHighCouncilEmails).post(createHighCouncilEmail)
router.route('/:id').delete(deleteHighCouncilEmail)

export default router
