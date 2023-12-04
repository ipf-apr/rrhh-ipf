const groupByRangeAge = (employeesByDateBirthday) => {
  const employeesByRangeAge = {
    "18-25": 0,
    "26-30": 0,
    "30+": 0,
  };

  employeesByDateBirthday.forEach((employee) => {
    if (employee.age >= 18 && employee.age <= 25) {
      employeesByRangeAge["18-25"]++;
    } else if (employee.age >= 26 && employee.age <= 30) {
      employeesByRangeAge["26-30"]++;
    } else {
      employeesByRangeAge["30+"]++;
    }
  });

  employeesByRangeAgeArray = Object.entries(employeesByRangeAge).map((e) => {
    return {
      rangeAge: e[0],
      count: e[1],
    };
  });


  

  return employeesByRangeAgeArray;
};

module.exports = groupByRangeAge;
