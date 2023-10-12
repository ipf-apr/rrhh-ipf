const { Router } = require('express')

const {
    indexView,
    index,
    show,
    update,
    store,
    destroy
} = require('../controllers/jobPositions.controllers')
const jobPositionSchema = require('../models/schemas/jobPosition.schema')
const validateSchema = require('../middleware/validations')


const router = Router()

//Vistas
router.get("/job-positions", indexView);

// API
router.get('/api/job-positions', index)
router.post('/api/job-positions', validateSchema(jobPositionSchema),  store)
router.get('/api/job-positions/:id/show', show)
router.put('/api/job-positions/:id/update', validateSchema(jobPositionSchema),  update)
router.delete('/api/job-positions/:id/destroy', destroy)

module.exports = router