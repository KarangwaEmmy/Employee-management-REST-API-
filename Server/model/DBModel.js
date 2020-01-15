import pool from '../config/config';

class StoreData {

  async createRecord(data) {
    const text = 'INSERT INTO Employee( position, name, nationalId, phoneNumber, email, dateofBirth, status,  createdDate, modifiedDate ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
    const values = [
      data.position,
       data.name,
        data.nationalId,
         data.phoneNumber,
          data.email, 
          data.dateofBirth, 
          'inactive', 
          new Date(),
           'none'];
    const { rows } = await pool.query(text, values);
    return rows;
  }
  async createEmployee(data) {
    const text = 'INSERT INTO Employee( position, name, nationalId, phoneNumber, email,password, dateofBirth, status,  createdDate, modifiedDate ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';
    const values = [
       'manager',
       data.name,
       data.nationalId,
       data.phoneNumber,
       data.email, 
       data.hashed,
       data.dateofBirth, 
       'inactive', 
       new Date(),
       'none'];
    const { rows } = await pool.query(text, values);
    return rows;
  }
  async changeStatus(status, recordId) {
    const text = 'UPDATE Employee SET status = $1, modifiedDate = $2 WHERE id = $3 returning*';
    const values = [status, new Date(), recordId];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  async updateEmployee(data, recordId) {

    const { position, name, nationalId, email, phoneNumber, dateofBirth } = data;
    const text = 'UPDATE Employee SET position = $1, name = $2, nationalId = $3, email = $4, phoneNumber = $5, dateofBirth = $6,  modifiedDate = $7 WHERE id = $8 returning*';
    const values = [position, name, nationalId, email, phoneNumber, dateofBirth, new Date(), recordId];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  async editStatus(data, recordId) {
    const { status } = data;
    const text = 'UPDATE Employee SET status = $1,  modifiedDate = $2 WHERE id = $3 returning*';
    const values = [status, new Date(), recordId];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  async searchItem(item) {
    const text = 'SELECT * FROM  Employee WHERE position = $1 OR email = $1 OR name = $1 OR phoneNumber = $1';
    const { rows } = await pool.query(text, [item]);
    return rows;
  }
  
  async fetchAllUser() {
    const retrieveAllEmployee = 'SELECT id, category, firstname, lastname, email, phoneNumber, createdDate, modifiedDate FROM userdb';
    const { rows } = await pool.query(retrieveAllEmployee);
    return rows;
  }

  async fetchAllRecords() {
    const retrieveAllRecords = 'SELECT * FROM Employee';
    const { rows } = await pool.query(retrieveAllRecords);
    return rows;
  }

  async fetchOneRecord(recordId) {
    const text = 'SELECT * FROM Employee WHERE id = $1';
    const values = [recordId];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  async fetchOneUser(Id) {
    const text = 'SELECT * FROM Employee WHERE id = $1';
    const values = [Id];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  async deleteRecord(recordId) {
    const text = 'DELETE FROM Employee WHERE id = $1 returning*';
    const values = [recordId];
    const { rows } = await pool.query(text, values);
    return rows;
  }
  async checkEmaiExist(email) {
    const emailToCheck = email.toString().trim().toLowerCase();
    const text = 'SELECT * FROM Employee WHERE email = $1';
    const values = [emailToCheck];
    const { rows } = await pool.query(text, values);
    return rows;
  }
  async checkNationalIdExist(nationalID) {
    const IDToCheck = nationalID;
    const text = 'SELECT * FROM Employee WHERE nationalId = $1';
    const values = [IDToCheck];
    const { rows } = await pool.query(text, values);
    return rows;
  }
  async checkPhoneExist(phone) {
    const PhoneToCheck = phone.toString().trim().toLowerCase();
    const text = 'SELECT * FROM Employee WHERE phoneNumber = $1';
    const values = [PhoneToCheck];
    const { rows } = await pool.query(text, values);
    return rows;
  }
}
const expstoreData = new StoreData();
export default expstoreData;
