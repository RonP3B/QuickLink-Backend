import Sequelize from "sequelize";
import User from "./User.js";
import sequelizeObj from "../database/sequelizeObj.js";

const Link = sequelizeObj.define("links", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  pageName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  originalLink: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  shortenedLink: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

User.hasMany(Link, { onDelete: "CASCADE" });
Link.belongsTo(User, { constraint: true });

export default Link;
