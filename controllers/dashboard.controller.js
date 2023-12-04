const groupByRangeAge = require("../helpers/groupByRangeAge");
const Employee = require("../models/employee");
const JobPosition = require("../models/jobPosition");

const index = async (req, res) => {
  try {
    const lastsEmployees = await Employee.findAll({
      attributes: ["id", "name", "image", "imageUrl", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: 6,
    });

    const employeesByGender = await Employee.count({
      group: ["gender"],
    });

    const [employeesByJobPosition] = await Employee.sequelize.query(
      `select COUNT(employee_job_position.employee_id) AS employeeByJobPosition,
              job_positions.id as jobPositionId,
              job_positions.position as jobPosition
        from employee_job_position INNER join 
              (select MAX(employee_job_position.id) as id_aggregate, 
              employee_job_position.employee_id 
              from employee_job_position group by employee_job_position.employee_id) as latestOfMany 
          on latestOfMany.id_aggregate = employee_job_position.id 
          and latestOfMany.employee_id = employee_job_position.employee_id
        RIGHT JOIN job_positions ON employee_job_position.job_position_id = job_positions.id
        LEFT JOIN employees ON employee_job_position.employee_id = employees.id 
        WHERE employees.deleted_at IS NULL AND job_positions.deleted_at IS NULL
        GROUP BY jobPosition, jobPositionId
        ORDER BY jobPosition ASC`
    );

    const [employeesBySkills] = await Employee.sequelize.query(`
    select skills.id as skillId,
		  COUNT(employee_skill.employee_id) AS employeeBySkill,
        skills.nameSkill as skill
        from employee_skill 
        RIGHT JOIN skills ON employee_skill.skill_id = skills.id
        LEFT JOIN employees ON employee_skill.employee_id = employees.id 
        WHERE employees.deleted_at IS NULL AND skills.deletedAt IS NULL
    GROUP BY skillId
    ORDER BY skillId ASC`);

    const employeesByDateBirthday = await Employee.findAll({
      attributes: ['id', 'dateBirthday', 'age']
    });

    const employeesByRangeAge = groupByRangeAge(employeesByDateBirthday);

    res.json({
      lastsEmployees,
      employeesByGender,
      employeesByJobPosition,
      employeesBySkills,
      employeesByRangeAge
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};



module.exports = {
  index,
};

