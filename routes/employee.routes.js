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
router.get('/:id/show', show)
router.get('/:id/edit', edit)
router.get('/create', create)
router.put('/:id/update', update)
router.post('', store)
router.delete('/:id/destroy', destroy)

console.log(router.route)
module.exports = router