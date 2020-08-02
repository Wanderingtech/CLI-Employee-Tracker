var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
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
                addDepartment();
                break;
            case "add employee":
                addEmployee();
                break;
            case "add employee role":
                addRole();
                break;
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
function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter department name",
            name: "departmentName"
        }
    ]).then(function(entry){
        connection.query("insert into department(name) values(?);", entry.departmentName, function(error, resp){
            if(error)throw error;
            console.log("Department added");
            displayMenu()
        })
    })
}
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter title",
            name: "titleName"
        },
        {
            type: "input",
            message: "Enter salary",
            name: "salaryName"
        },
        {
            type: "list",
            choices: [1,2,3],
            message: "Enter department id",
            name: "depId"
        }
    ]).then(function(entry){
        connection.query("insert into employee_role(title, salary, department_id) values(?, ?, ?);", [entry.titleName, entry.salaryName, entry.depId], function(error, resp){
            if(error)throw error;
            console.log("role added");
            displayMenu()
        })
    })
}
function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter first name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter last name",
            name: "lastName"
        },
        {
            type: "list",
            choices: [1,2,3,4,5],
            message: "Select role ID",
            name: "roleId"
        },
        {
            type: "list",
            choices: [0,1,2],
            message: "Select manager ID",
            name: "managerId"
        }
    ]).then(function(entry){
        connection.query("insert into employee(first_name, last_name, role_id, manager_id) values(?, ?, ?, ?);", [entry.firstName, entry.lastName, entry.roleId, entry.managerId], function(error, resp){
            if(error)throw error;
            console.log("role added");
            displayMenu()
        })
    })
}