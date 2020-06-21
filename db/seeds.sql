use employees_db;
insert into department (name) values 
("Human Resources"),
("IT"),
("Sales"),
("Accounting"),
("Logistics"),
("Customer Service"),
("Recruiting"),
("Upper Management"),
("Payroll");

insert into roles (title, salary, department_id) values
("Receptionist", 40000, 6),
("IT Manager",65000,2),
("Database Admin",65000,2),
("Recruitment Specialist",60000,7),
("Work Force Coordinator",50000,5),
("CSR",45000,6),
("Payroll Administrator",55000,9),
("Office Culture Manager",65000,1),
("Fulfillment Director", 70000, 3),
("President of Sales",115000,3),
("Accounts Receivable Analyst",60000,4),
("Accounts Payable Analyst",60000,4),
("Project Accountant",80000,4),
("Senior Accountant",90000,4),
("Product Specialist", 66000,2),
("Dispatcher",55000,5),
("Full Stack Developer",90000, 2),
("CEO", 200000, 8),
("COO",190000,8),
("CTO",185000,8); 

insert into employee (first_name, last_name, role_id, manager_id) values
("Meedaxa", "Ahmed",20,null),
("Niroshana","Witharana",18,null),
("Dan", "Phillips",19,null),
("Joe","Dodgson",2,1),
("Jacob","Houston",1,2),
("Dragos","Dragomir",5,null),
("Stephen","Rafferty",6,null),
("Ben","Ashley",7,null),
("John","Smith",8,null),
("Jane","Doe",17,1),
("Joe","Bloggs",11,13),
("Maimuna","Omar",11,13),
("Dan","Williams",13,2),
("Robert","Robertson",15,4);