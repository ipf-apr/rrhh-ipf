const bcryptjs = require("bcryptjs");
const User = require("../models/user");

async function createFirstUser(){
    const exist = await User.count();
    if (exist === 0) {
      await User.create({
        name: 'Administrador',
        lastName: 'Administrador',
        username: 'admin',
        password: await bcryptjs.hash('password', 8),
        role: 'admin'
      })
    }
  }

module.exports = createFirstUser