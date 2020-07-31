CREATE DATABASE Employee;
USE Employee;
CREATE table Department(id int auto_increment, name varchar(30), primary key(id));
CREATE table employee_role(id int auto_increment primary key, title varchar(20), salary decimal, department_id int references department(id));
create table employee(id int auto_increment primary key, first_name varchar(20), last_name varchar(20), role_id int references employee_role(id), manager_id int);