SELECT * 
FROM department
JOIN role 
    ON department.id = role.department_id
JOIN employee
    ON role.id = employee.role_id;