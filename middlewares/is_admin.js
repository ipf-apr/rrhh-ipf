

const isAdmin = async (req, res, next) => {

    try {
        if (req.user && req.user.role !== "admin") {
            throw {
                statusCode: 401,
                message: "No estás autorizado para realizar esta acción.",
            };

        } else {
            next();
        }
    } catch (error) {

        return res.status(error.statusCode || 500).json({
            message: error.message || "Error de inesperado del servidor.",
        });
    }
};

module.exports = { isAdmin };
