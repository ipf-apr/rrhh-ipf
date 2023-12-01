const Employee = require("../models/employee");

const index = async (req, res) => {
    try {
        const lastsEmployees = await Employee.findAll({
            attributes: ['id', 'name', 'image', 'imageUrl', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 6
        });

        res.json({
            lastsEmployees
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports = {
  index,
};
