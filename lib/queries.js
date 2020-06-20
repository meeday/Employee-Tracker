const connection = require("../config/connection");

class QUERY {

  async getAllDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getAllDepartmentNames() {
    let query = "SELECT name FROM department";
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getAllEmployees() {
    let query = "SELECT * FROM  employee";
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getAllEmployeeNames() {
    let query = "SELECT id, first_name, last_name FROM employee";
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getAllEmployeesFullData() {
    let query = `SELECT  e.id,
    first_name,
    last_name,
    r.title,
    r.salary,
    (select concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE e.manager_id = e2.id) AS 'manager',
    d.name
    FROM employee AS e
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getAllManagerNames() {
    let query = `SELECT distinct id,
    concat(first_name, ' ',last_name) AS 'name'          
    FROM employee
    WHERE id IN (select manager_id FROM employee WHERE manager_id is not null)`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getEmployeeByName(fullName) {
    let query = `SELECT  e.id,
    first_name,
    last_name,
    r.title,
    r.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE e.manager_id = e2.id) AS 'manager',
    d.name
    FROM employee AS e
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    WHERE concat(first_name, ' ',last_name) = '${fullName}'`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getEmployeeByName(id) {
    let query = `SELECT  e.id,
    first_name,
    last_name,
    r.title,
    r.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE e.manager_id = e2.id) AS 'manager',
    d.name
    FROM employee AS e
    LEFT JOIN role AS r on e.role_id = r.id
    LEFT JOIN department AS d on r.department_id = d.id
    WHERE e.id = ${id}`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getEmployeesByDepartment(department) {
    let query = `SELECT  e.id,
    first_name,
    last_name,
    r.title,
    r.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE e.manager_id = e2.id) AS 'manager'            
    FROM employee AS e
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    WHERE d.name = '${department}'`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getEmployeesByManager(manager) {
    let query = `SELECT  e.id,
    first_name,
    last_name,
    r.title,
    r.salary,          
    d.name
    FROM employee AS e
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    WHERE manager_id = ${manager.id}`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getEmployeesByRole(role) {
    let query = `SELECT  e.id,
    first_name,
    last_name,
    r.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE e.manager_id = e2.id) AS 'manager',            
    d.name AS 'department'
    FROM employee AS e
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    WHERE r.title = '${role}'`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getAllRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async getAllRolesWithDepartmentName() {
    let query = `SELECT r.id, title, salary, d.name AS 'department'
    FROM role AS r
    LEFT JOIN department AS d ON r.department_id = d.id`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async updateEmployeeRole(employee, role) {
    let query = `UPDATE employee SET role_id = ${role.id}
    WHERE id = ${employee.id} `;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log("role updated");
    });
  }

  async addEmployee(employee) {
    let query = `INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
    VALUES ('${employee.first_name}',
            '${employee.last_name}',
            ${employee.role_id},
            ${employee.manager_id})`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res.insertId);
    });
  }

  async addRole(role) {
    let query = `INSERT INTO role
    (title, salary, department_id)
    VALUES ('${role.title}',
            ${role.salary},
            ${role.department_id})`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res.insertId);
    });
  }

  async addDepartment(department) {
    let query = `INSERT INTO department(name) VALUES ('${department}')`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res.insertId);
    });
  }

  async removeDepartment(id) {
    let query = `DELETE WHERE department WHERE id = ${id}`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async removeEmployee(id) {
    let query = `DELETE FROM employee WHERE id = ${id}`;
    let query = `DELETE WHERE department WHERE id = ${id}`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }

  async removeRole(id) {
    let query = `DELETE FROM role WHERE id = ${id}`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.end();
      console.log(res);
    });
  }
}

module.exports = QUERY;