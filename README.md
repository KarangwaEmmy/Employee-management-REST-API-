EMployee Management Back-end (Restful API)

## API features


.
>ROUTE: /employees (REQUEST: POST)
o A manager should be able to edit, suspend, activate, and delete
employee records.
>Delete Employee ROUTE: /employees/{employee id} (REQUEST:
DELETE)
>Edit Employee ROUTE: /employees/{employee id} (REQUEST: PUT)
>Activate Employee ROUTE: /employees/{employee id}/activate
(REQUEST: PUT)
>Suspend Employee ROUTE: /employees/{employee id}/suspend
(REQUEST: PUT)
 Search Feature:
o A manager should be able to search for an employee based on his
position, name, email or phone number.
>Search ROUTE: /employees/search (REQUEST: POST)


To run project on Local machine
`git clone https://github.com/KarangwaEmmy/Employee-management-REST-API-.git`
## API ENDPOINTS

### *BASEURL : `/api/`*

### AUTHENTICATION END POINTS  : `/auth/`

HTTP METHOD | END POINT | AUTHENTICATED | DESCRIPTION
-----------|----------|--------------   |------
POST       | `/signup`|  True           |Create a New User
POST       | `/signin`|  True           |Login The existing User 



### An employee End POINTS

HTTP METHOD|    END POINT            | DESCRIPTION
-----------|-------------------------|------
GET        | `/employee`            | Get all employees
POST       | `/employee`            | Create an employee
GET        | `/employee/:id`        | Get  specified employee by Id
PATCH      | `/employee/:id`        | UPDATE  an employee 
DELETE     | `/employee/:id`        | Delete a employee
PATCH      | `/employee/:id/activate`| Activating an employee.
PATCH      | `/employee/:id/suspend`| Suspend an employee.
GET        | `/employee/search/:position`| Search an employee by position.
GET        | `/employee/search/:name`| Search an employee by name.
GET        | `/employee/search/:email`| Search an employee by email.
GET        | `/employee/search/:phoneNumber`| Search an employee by PhoneNumber.




License `ISC`

Done by Emmy Karangwa.