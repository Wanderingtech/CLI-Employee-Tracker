var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "local host",
    user: "root",
    password: "Stronghand12",
    database: "employee"
})
connection.connect(function () {
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
                viewDepartment()
                break
            case "view employee":
            case "view employee roles":
            case "add department":
            case "add employee":
            case "add employee role":
            case "exit application":
                connection.end();
                process.exit(0)
        }
    })
}
