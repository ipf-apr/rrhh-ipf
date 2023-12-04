const getDateForSqlFromAge = (age) => {
  const date = new Date(new Date().setFullYear(new Date().getFullYear() - age));
  return date.toISOString().split("T")[0];
};

module.exports = getDateForSqlFromAge;
