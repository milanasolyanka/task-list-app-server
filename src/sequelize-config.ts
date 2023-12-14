import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_list_database", "root", "admin", {
  host: "db",
  dialect: "mysql",
});

export default sequelize;
