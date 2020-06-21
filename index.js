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