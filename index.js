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