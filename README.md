EMployee Management Back-end (Restful API)

## API features


To run project on Local machine
`git clone https://github.com/KarangwaEmmy/Employee-management-REST-API-.git`
## API ENDPOINTS

### *BASEURL : `/api/`*

### AUTHENTICATION END POINTS  : `/auth/`

HTTP METHOD | END POINT | AUTHENTICATED | DESCRIPTION
-----------|----------|--------------   |------
POST       | `/signup`|  True           |Create a New Employee
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
POST        | `/employeeS/search`| Search an employee by position, name, email, phoneNumber etc.





License `ISC`

Done by Emmy Karangwa.