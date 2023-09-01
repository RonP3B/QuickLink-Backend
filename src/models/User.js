import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import sequelizeObj from "../database/sequelizeObj.js";

const User = sequelizeObj.define("users", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.beforeSave(async (user) => {
  try {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
    }
  } catch (error) {
    console.log(`Password hash failed: ${error}`);
  }
});

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
