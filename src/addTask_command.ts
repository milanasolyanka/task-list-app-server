import Task from "./sequelize-models";
const commander = require("commander");

//npx ts-node addTask_command.ts clear_database

commander
  .command("clear_database")
  .description("Очистить базу данных")
  .action(async () => {
    try {
      await Task.destroy({ where: {} });
      console.log("База данных очищена успешно.");
    } catch (error) {
      console.error("Ошибка при очистке базы данных:", error);
    }
  });

commander.parse(process.argv);

// show databases;
// use task_list_database;
// show tables;
// select * from tasks;
