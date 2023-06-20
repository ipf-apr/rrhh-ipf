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

// API
router.get('/api/users', index)
router.get('/api/users/:id/show', show)
router.put('/api/users/:id/update', update)
router.delete('users/:id/destroy', destroy)
router.post('/api/users', store)

console.log(router.route)
module.exports = router