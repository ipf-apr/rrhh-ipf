const { Employee } = require('../models/index');

const index = (_req, res) => {
    try {
        Employee.findAll().then(employees => {
            res.render('employees/index', { employees });
        })
    } catch (error) {
        throw error;
    }
}

const show = async (req, res) => {
    const employeeId = req.params.id

    await Employee.findByPk(employeeId)
    .then(employee => {
        res.render('employees/show', { employee })
    })
    .catch(err => {

    })

}

const create = (_req, res) => {

}

const store = (req, res) => {
    
}

const edit = (_req, res) => {
    
}

const update = (req, res) => {
    
}

const destroy = (req, res) => {
   
}

module.exports = {
    index,
    show,
    edit,
    update,
    create,
    store,
    destroy
}