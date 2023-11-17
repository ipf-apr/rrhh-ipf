const Employee = require("../models/employee");

const imageEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { filename } = req.file; // Cambiado de imageRoute a filename, ajusta según tu configuración de multer
  console.log('Esto es lo que recibe', employeeId);

  try {
    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Actualizar solo el campo de imagen
    await Employee.update(
      {
        image: filename,
      },
      {
        where: {
          id: employeeId, 
        },
      }
    );

    return res.json({ message: "Imagen actualizada correctamente", employee });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

module.exports = imageEmployee;
