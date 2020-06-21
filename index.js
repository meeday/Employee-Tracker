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