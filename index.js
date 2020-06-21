const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const UserSearch = require("./lib/UserSearch");
const Questions = require("./lib/questions");

const newSearch = new UserSearch();
const questions = new Questions();

const init = () => {
  console.log("Welcome to Employee Tracker");
  loadMenu();
}

const loadMenu = async () => {
  await inquirer.prompt(questions.startPage)
  .then(async answers => {
      switch(answers.choice){
          case "View All Employees":
              await getAllEmployeesFullData();                
              break;
          case "View Departments":
              await viewAllDepartments();                
              break;
          case "View Roles":
              await viewAllRoles();                
              break;
          case "View employees by Manager":
              await viewEmployeesByManager();
              break;
          case "Add a Department":
              await addDepartment();
              break;
          case "Add a Role":
              await addRole();
              break;
          case "Update Employee Role":
              await updateEmployeeRole();
              break;
          case "Add an Employee":
              await addEmployee();
              break;
          case "End":     
              break;
          default:
              break;
      }        
  });   
}

const viewEmployeesByManager = async () => {
  let managers;
  let managerList;

  await newSearch.getAllManagerNames()
  .then(res => {
      managers = res; 
      managerList = managers.map(e => e.name);                    
      managerList.push("Cancel");                        
  });           
               
  await inquirer.prompt({
      message:"Choose a manager:",
      type: "list",
      choices: managerList,
      name: "choice"
  }).then(async function(answer){
      switch (answer.choice){
      case "Cancel":
          
          break;
      default:
          
          manager = managers.find(e => e.name === answer.choice);
          await newSearch.getEmployeesByManager(manager).then(res => {
              console.table(res);
          });
          break;
      }
      
  });
  loadMenu();
}

const viewAllRoles = async () => {
  await newSearch.viewAllRoles()
  .then(res => {
    console.table(res);
  });
  loadMenu();
}

const viewAllDepartments = async () => {
  await newSearch.getAllDepartments()
  .then(res => {
    console.table(res);
  });
  loadMenu();
}

const getAllEmployeesFullData = async () => {
  await newSearch.getAllEmployeesFullData()
  .then(res => {
    console.table(res);
  });
  loadMenu();
}

const addDepartment = async () => {
    
  await inquirer.prompt(questions.addDepartment)
  .then(async answer => {        
      await newSearch.addDepartment(answer.department)
      .then(res => {
          console.log(`New Department ID: ${res}`);
      });
  });
  
  loadMenu();

}

const addRole = async () => {
  let q = questions.addRole;
  let departments;
  let departmentNames;
  
  await newSearch.getAllDepartments().then(res=>{
      departmentNames = res.map(e=>e.name);
      departments = res;
  });

  //set the list of choices
  q.find(e=>e.name === "department").choices = departmentNames;
  q.find(e=>e.name === "department").pageSize = departmentNames.length;

  await inquirer.prompt(q)
  .then(async answers => {
      
      let role = {
          title: answers.title,
          salary: answers.salary,
          department_id: departments.find(e=>e.name === answers.department).id
      };

      await newSearch.addRole(role)
      .then(res=>{
          console.log(res);
      });

  });
  
  loadMenu();
}

const updateEmployeeRole = async () => {
  let q = questions.updateEmployeeRole;
  let confirm = questions.confirmInput;
  let roles;
  let roleNames;
  let employees;
  let employeeNames;
  let employee;
  let role;

  await newSearch.getAllRoles().then(res=>{
      roles = res;
      roleNames = res.map(e=>e.title);
  });

  await newSearch.getAllEmployees().then(res=>{
      employees = res;
      employeeNames = res.map(e => `${e.first_name} ${e.last_name}`);
  });

  q.find(e=>e.name === "employee").choices = employeeNames;
  q.find(e=>e.name === "employee").pageSize = employeeNames.length;
  q.find(e=>e.name === "role").choices = roleNames;
  q.find(e=>e.name === "role").pageSize = roleNames.length;
  
  await inquirer.prompt(q)
  .then(async answers => {
  
      employee = employees.find(e=> `${e.first_name} ${e.last_name}` === answers.employee);
      role = roles.find(e=>e.title === answers.role);

  });

  confirm.message = `Would you like to update the role of ${employee.first_name} ${employee.last_name} to ${role.title}? Please Confirm`;

  await inquirer.prompt(confirm)
  .then(async answer => {
      if(answer.confirm){
          await newSearch.updateEmployeeRole(employee,role)
          .then(res=>{
              console.log(res);
              return;
          });
      }
  });

  loadMenu();

}

const addEmployee = async () => {
  let q = questions.addEmployee;
  let managers;
  let managerNames;
  let roles;
  let roleNames;
  
  await newSearch.getAllManagerNames().then(res=>{
      managerNames = res.map(e=>e.name);
      managers = res;
      managerNames.push("None");
  });

  await newSearch.getAllRoles().then(res=>{
      roles = res;
      roleNames = res.map(e=>e.title);
  });

  q.find(e => e.name === "role").choices = roleNames;
  q.find(e => e.name === "role").pageSize = roleNames.length;
  q.find(e => e.name === "manager").choices = managerNames;
  q.find(e => e.name === "manager").pageSize = managerNames.length;
  
  await inquirer.prompt(q)
  .then(async answers => {
      
      let role_id = roles.find(e=>e.title === answers.role).id;
      
      let manager_id = answers.manager === "None"?null: managers.find(e => e.name === answers.manager).id;
      
      let employee = {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: role_id,
          manager_id: manager_id 
      };

      await newSearch.addEmployee(employee)
      .then(res=>{
          console.log("New Employee ID: " + res);
      });

  });
  
  loadMenu();
}

init();

