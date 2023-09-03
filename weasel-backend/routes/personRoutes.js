import express from 'express'
const router = express.Router()

import {
    getPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
} from '../controllers/personController.js'

router.route('/').get(getPersons).post(createPerson)
router.route('/:id').get(getPersonById).put(updatePerson).delete(deletePerson)