
const getPagination = (page, size) => {
  const limit = size ? +size : 10; // Si no se proporciona el tamaño, se establece en 10 por defecto
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

module.exports = getPagination;
