
const user = `INSERT INTO Employee( position, name, nationalId, phoneNumber, email, password, dateofBirth, status,  createdDate, modifiedDate ) 
VALUES( 'Manager', 'Emmy Karangwa', '1199380063392105', '0786639530', 'karangwae10@gmail.com', 'Rwanda@123','15-Aug-1994', 'active', ' 2019-06-24T05:56:03.315Z', ' none' );`;

const user1 = `INSERT INTO Employee( position, name, nationalId, phoneNumber, email, password, dateofBirth, status,  createdDate, modifiedDate ) 
VALUES('Developer', 'Emily Mutaga', '1199380063392105', '0786639530', 'mutagaemily@gmail.com', 'mutaga@123', '15-Aug-1994', 'active',  ' 2019-06-24T05:56:03.315Z', ' none' );`;

 

export default { user, user1};