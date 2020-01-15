
const data = `INSERT INTO Employee( position, name, nationalId, phoneNumber, email, password, dateofBirth, status,  createdDate, modifiedDate ) 
               VALUES( 'Manager', 'Emmy Karangwa', '1199380063392105', '0786639530', 'karangwae10@gmail.com', '', '15-Aug-1994', 'active', ' 2019-06-24T05:56:03.315Z', ' none' );`;

const data1 = `INSERT INTO Employee( position, name, nationalId, phoneNumber, email, password, dateofBirth, status,  createdDate, modifiedDate ) 
               VALUES('Developer', 'Emily Mutaga', '1199380063392105', '0786639530', 'mutagaemily@gmail.com', '', '15-Aug-1994', 'active',  ' 2019-06-24T05:56:03.315Z', ' none' );`;

const data2 = `INSERT INTO Employee( position, name, nationalId, phoneNumber, email, password, dateofBirth, status,  createdDate, modifiedDate ) 
               VALUES( 'Developer', 'Mugisha Felix', '1199380063392105', '0786639530', 'mugishafelix@gmail.com','', ' 15-Aug-1994', ' inactive', ' 2019-03-11T19:04:22.1915Z', ' none' );`;

const data3 = `INSERT INTO Employee( position, name, nationalId, phoneNumber, email, password, dateofBirth, status,  createdDate, modifiedDate ) 
               VALUES( 'Designer', 'Muteteri Ruth', '1199380063392105', '0786639530', 'muteteriruth@gmail.com','', ' 15-Aug-1994', ' inactive', ' 2019-03-11T19:04:22.1915Z', ' none' );`;

export default { data, data1, data2, data3 };

