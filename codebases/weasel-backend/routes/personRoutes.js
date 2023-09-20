import express from 'express'
const router = express.Router()

import {
    getPersons,
    getPersonById,
    getPersonsByWard,
    createPerson,
    updatePerson,
    deletePerson
} from '../controllers/personController.js'

router.route('/').get(getPersons).post(createPerson)
router.route('/ward/:ward').get(getPersonsByWard)
router.route('/:id').get(getPersonById).put(updatePerson).delete(deletePerson)

export default router