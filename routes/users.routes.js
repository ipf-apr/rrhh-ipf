const { Router } = require('express')

const {
    indexView,
    showView,
    editView,
    createView,
    index,
    show,
    update,
    store,
    destroy
} = require('../controllers/users.controllers')


const router = Router()

// Vistas
router.get('/users', indexView)
router.get('/users/create', createView)
router.get('/users/:id/show', showView)
router.get('/users/:id/edit', editView)

// API
router.get('/api/users', index)
router.post('/api/users', store)
router.get('/api/users/:id/show', show)
router.put('/api/users/:id/update', update)
router.delete('/api/users/:id/destroy', destroy)

console.log(router.route)
module.exports = router