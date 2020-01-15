import pool from '../../config/config';
import createTableQueries from './createTableQuerie';
import EmployeeTable from './insertDataQueries';


const allQueries = async () => {
  await pool.query(createTableQueries.EmployeeDBTable);
  await pool.query(EmployeeTable.data);
  await pool.query(EmployeeTable.data1);
  await pool.query(EmployeeTable.data2);
  await pool.query(EmployeeTable.data3);
  console.log('Hy Manager You are Successfully Crated Table & Sample data has been added to the table');
};

(async () => {
  await pool.query(allQueries);
})().catch();
export default allQueries;
