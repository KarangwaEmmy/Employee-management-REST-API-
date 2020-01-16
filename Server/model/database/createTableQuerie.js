const EmployeeDBTable = `
CREATE TABLE Employee(
    Id SERIAL PRIMARY KEY,
    position VARCHAR(255),
    name VARCHAR(255),
    nationalid VARCHAR,
    phonenumber VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    dateofbirth VARCHAR(255),
    status VARCHAR(255),
    createdDate VARCHAR(255),
    modifiedDate VARCHAR(255)
  );`;
 
export default { EmployeeDBTable };
