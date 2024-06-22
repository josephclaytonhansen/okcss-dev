import express from 'express'
const router = express.Router()


import { getHighCouncilEmails, updateHighCouncilEmails } from '../controllers/highCouncilEmailController.js'

router.route('/').get(getHighCouncilEmails)

export default router
