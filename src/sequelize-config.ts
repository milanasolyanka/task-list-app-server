import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_list_database", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
