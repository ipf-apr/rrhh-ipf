const { Router } = require('express')

const {
    index,
    show,
    update,
    created,
    store,
    destroy
} = require('../controllers/users.controllers')


const router = Router()

router.get('', index)
router.get('/:id/show', show)
router.get('/created', created)
router.put('/:id/update', update)
router.post('', store)
router.delete('/:id/destroy', destroy)

console.log(router.route)
module.exports = router