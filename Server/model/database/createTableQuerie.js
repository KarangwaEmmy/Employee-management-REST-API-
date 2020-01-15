const EmployeeDBTable = `
CREATE TABLE Employee(
    Id SERIAL PRIMARY KEY,
    position VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    nationalId VARCHAR NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dateofBirth VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    createdDate VARCHAR(255) NOT NULL,
    modifiedDate VARCHAR(255) NOT NULL
  );`;


export default { EmployeeDBTable };
