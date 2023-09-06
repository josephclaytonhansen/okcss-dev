import asyncHandler from '../middleware/asyncHandler.min.js'
import Person from '../models/Person.js'

const getPersons = asyncHandler(async (req, res) => {
    const persons = await Person.find()
    res.json(persons)
})

const getPersonById = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id)
    res.json(person)
})

const getPersonsByWard = asyncHandler(async (req, res) => {
    const persons = await Person.find({ ward: req.params.ward })
    res.json(persons)
})

const getPersonsByWardAndOrganization = asyncHandler(async (req, res) => {
    const persons = await Person.find({ ward: req.params.ward, category: req.params.organization })
    res.json(persons)
})

const createPerson = asyncHandler(async (req, res) => {
    const person = await Person.create(req.body)
    res.json(person)
})

const updatePerson = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id)
    if (person) {
        person.ward = req.body.ward || person.ward
        person.name = req.body.name || person.name
        person.image = req.body.image || person.image
        person.position = req.body.position || person.position
        person.email = req.body.email || person.email
        person.phone = req.body.phone || person.phone
        person.size = req.body.size || person.size
        person.organization = req.body.organization || person.organization
        person.bio = req.body.bio || person.bio
        const updatedPerson = await person.save()
        res.json(updatedPerson)
    } else {
        res.status(404)
        throw new Error('Person not found')
    }
})

const deletePerson = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id)
    if (person) {
        await person.remove()
        res.json({ message: 'Person removed' })
    } else {
        res.status(404)
        throw new Error('Person not found')
    }
})

export {
    getPersons,
    getPersonById,
    getPersonsByWard,
    getPersonsByWardAndOrganization,
    createPerson,
    updatePerson,
    deletePerson
}