const { Router } = require('express')

const {
    indexView,
    index,
    show,
    update,
    store,
    destroy
} = require('../controllers/jobPositions.controller')
const jobPositionSchema = require('../models/schemas/jobPosition.schema')
const validateSchema = require('../middlewares/validations')


const router = Router()

//Vistas
router.get("/job-positions", indexView);

// API
router.get('/api/jobPositions', index)
router.post('/api/jobPositions', validateSchema(jobPositionSchema),  store)
router.get('/api/jobPositions/:id/show', show)
router.put('/api/jobPositions/:id/update', validateSchema(jobPositionSchema),  update)
router.delete('/api/jobPositions/:id/destroy', destroy)

module.exports = router