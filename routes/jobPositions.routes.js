const { Router } = require('express')

const {
    index,
    show,
    update,
    store,
    destroy
} = require('../controllers/jobPositions.controllers')
const jobPositionSchema = require('../models/schemas/jobPosition.schema')
const validateSchema = require('../middleware/validations')


const router = Router()

// API
router.get('/api/jobPositions', index)
router.post('/api/jobPositions', validateSchema(jobPositionSchema),  store)
router.get('/api/jobPositions/:id/show', show)
router.put('/api/jobPositions/:id/update', validateSchema(jobPositionSchema),  update)
router.delete('/api/jobPositions/:id/destroy', destroy)

module.exports = router