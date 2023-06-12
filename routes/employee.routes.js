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

router.get('', index)
router.get('/:id', show)
router.get('/:id/edit', edit)
router.put('/:id', update)
router.get('/create', create)
router.post('', store)
router.delete('/:id', destroy)


module.exports = router