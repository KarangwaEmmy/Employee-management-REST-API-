const user = `INSERT INTO userdb( category, firstname, lastname, username, email, phoneNumber, password, createdDate, modifiedDate ) 
               VALUES( 'admin', 'minani', 'joshua', 'key-joshua', 'k.joshua855@gmail.com', '+250789619442', '$2a$12$3T3wDmPeNBaZe9uFfm23zeguUOoRwWzp5n1E7.rTZsVqZuipK7Som', '2019-11-04T16:02:22.315Z',' none' );`;

const user1 = `INSERT INTO userdb( category, firstname, lastname, username, email, phoneNumber, password, createdDate, modifiedDate ) 
               VALUES( 'user', 'moriah', 'jessica', 'Jessy', 'jessy@gmail.com', '+250780000000', '$2a$12$2ITV7msFVWz73xHTYIapb.rqsMWw5HaINzwnIocGCp2K/o.rnn4/O', '2019-11-04T14:51:24.283Z',' none' );`;

export default { user, user1 };
