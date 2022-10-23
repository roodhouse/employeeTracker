INSERT INTO department (id, name)
VALUES (001, "Engineering"),
       (002, "Sales"),
       (003, "Finance"),
       (004, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Lead Engineer", 150000, 001),
       (002, "Software Engineer", 120000, 001),
       (003, "Sales Lead", 100000, 002),
       (004, "Salesperson", 80000, 002),
       (005, "Account Manager", 160000, 003),
       (006, "Accountant", 125000, 003),
       (007, "Legal Team Lead", 250000, 004),
       (008, "Lawyer", 190000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "James", "Ford", 001, null),
       (002, "John", "Locke", 002, 001),
       (003, "Jack", "Shepard", 003, null),
       (004, "Kate", "Austen", 004, 003),
       (005, "Hugo", "Reyes", 005, null),
       (006, "Ben", "Linus", 006, 005)
       (007, "Richard", "Alpert", 007, null),
       (008, "Penny", "Widmore", 008, 007);