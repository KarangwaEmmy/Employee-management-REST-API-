
import { Router } from 'express';
import upload from '../Helper/Upload';
import ExportEmployee from '../controller/EmpController';
import fileUpload from '../controller/uploadController';


const router = Router();
router.post('/employee', ExportEmployee.createEmployee);
router.get('/employee', ExportEmployee.fetchAllEmployees);
router.get('/employee/:id', ExportEmployee.FetchoneEmployee);
router.delete('/employee/:id', ExportEmployee.destroyRecord);
router.patch('/employee/:id', ExportEmployee.updateEmployee);
router.patch('/employee/:id/activate', ExportEmployee.activateEmployee);
router.patch('/employee/:id/suspend', ExportEmployee.suspendEmployee);


// search route
router.post('/employees/search', ExportEmployee.SeachByItem);

export default router;
