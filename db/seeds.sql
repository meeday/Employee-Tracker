INSERT INTO department (department_name) VALUES
("Manager"), ("Employee"), ("Intern");

INSERT INTO roles (title, salary, department_id) VALUES
("Manager", 100000.00, 1), ("Employee", 90000.00, 2), ("Intern", 40000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Meedaxa", "Ahmed", 1, null),
("Niroshana", "Witharana", 2, 1),
("Dan", "Phillips", 2, 1),
("Joe", "Dodgson", 3, 2),
("Jacob", "Houston", 2, 2),
("Dragos", "Dragomir", 2, 2),
("Stephen", "Rafferty", 2, 2),
("Ben", "Ashley", 2, 2),
("John", "Smith", 3, 2),
("Jane", "Doe", 3, 2);
