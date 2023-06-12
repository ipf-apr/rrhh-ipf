const { Router } = require('express')

const {
    index,
    show,
    edit,
    update,
    create,
    store,
    destroy
} = require('../controllers/employees.controller')

const router = Router()

router.get('/employees', index)
router.get('/employees/:id', show)
router.get('/employees/:id/edit', edit)
router.put('/employees/:id', update)
router.get('/employees/create', create)
router.post('/employees', store)
router.delete('/employees/:id', destroy)


module.exports = router