var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Stronghand12",
    database: "employee"
})
connection.connect(function(error){
    if(error)throw error;
    console.log("mysql connection established");
    displayMenu();
})
function displayMenu() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["view department", "view employee", "view employee roles", "add department", "add employee", "add employee role", "exit application"],
            name: "userEntry",
            message: "What would you like to do?"
        }
    ]).then(function (resp) {
        switch (resp.userEntry) {
            case "view department":
                viewDepartment();
                break;
            case "view employee":
                viewEmployee();
                break;
            case "view employee roles":
                viewEmployeeRole();
                break;
            case "add department":
            case "add employee":
            case "add employee role":
            case "exit application":
                connection.end();
                process.exit(0)
        }
    })
}
function viewDepartment(){
    connection.query("select * from department;", function(error,data){
        if(error)throw error
        console.table(data)
        displayMenu()
    })
}
function viewEmployee(){
    connection.query("select * from employee;", function(error,data){
        if(error)throw error
        console.table(data)
        displayMenu()
    })
}
function viewEmployeeRole(){
    connection.query("select * from employee_role;", function(error,data){
        if(error)throw error
        console.table(data)
        displayMenu()
    })
}