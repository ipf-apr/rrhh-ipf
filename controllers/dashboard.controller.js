const Employee = require("../models/employee");

const index = async (req, res) => {
    try {
        const lastsEmployees = await Employee.findAll({
            attributes: ['id', 'name', 'image', 'imageUrl', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 6
        });

        const employeesByGender = await Employee.count({
            group: ['gender']
        })

        res.json({
            lastsEmployees,
            employeesByGender
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports = {
  index,
};
