const { Router } = require('express')

const {
    index,
    show,
    update,
    store,
    destroy
} = require('../controllers/jobPositions.controllers')


const router = Router()

// API
router.get('/api/jobPositions', index)
router.post('/api/jobPositions', store)
router.get('/api/jobPositions/:id/show', show)
router.put('/api/jobPositions/:id/update', update)
router.delete('/api/jobPositions/:id/destroy', destroy)

module.exports = router