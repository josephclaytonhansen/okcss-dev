import express from 'express'
const router = express.Router()

import {
    getPersons,
    getPersonById,
    getPersonsByWard,
    getPersonsByWardAndOrganization,
    createPerson,
    updatePerson,
    deletePerson
} from '../controllers/personController.js'

router.route('/').get(getPersons).post(createPerson)
router.route('/:id').get(getPersonById).put(updatePerson).delete(deletePerson)
router.route('/ward/:ward').get(getPersonsByWard)
router.route('/ward/:ward/organization/:organization').get(getPersonsByWardAndOrganization)

export default router