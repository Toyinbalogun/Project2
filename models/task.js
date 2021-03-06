// Get the connection to the database
const DB = require("../db");
const connection = new DB({ database: "tasks_db" }).connection;

class Task {
  constructor({ routeName, taskName, taskDescription, taskDeadline }) {
    this.routeName = routeName;
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskDeadline = taskDeadline;
  }

  static async findAll() {
    const [rows] = await connection.query(`SELECT * FROM tasks;`);
    return rows;
  }

  static async findById(id) {
    const [rows] = await connection.query(`SELECT * FROM tasks WHERE id = ?;`, [
      parseInt(id),
    ]);

    let task = null;
    if (rows.length) {
      task = new Task(rows[0]);
      task.id = id;
    }
    return task;
  }

  static async delete(id) {
    if (id) {
      const [result] = await connection.query(`DELETE FROM tasks WHERE id = ?;`,[parseInt(id)]);
      console.log(result)
      if(result.affectedRows > 0){
        return true
      }
    }
    return false;
  }

  async save() {
    if (this.id) {
      return this.update();
    } else {
      return this.create();
    }
  }

  async create() {
    const sql = `INSERT INTO tasks (routeName, taskName, taskDescription, taskDeadline) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.query(sql, [
      this.routeName,
      this.taskName,
      this.taskDescription,
      this.taskDeadline,
    ]);
    this.id = result.id;
    return this;
  }

  async update(id) {
    const sql = `UPDATE tasks SET ? WHERE id = ?`;
    await connection.query(sql, [
      {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskDeadline: this.taskDeadline,
      },
      this.id,
    ]);
    return this;
  }
}

module.exports = Task;
