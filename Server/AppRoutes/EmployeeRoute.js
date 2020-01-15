
import { Router } from 'express';

import ExportEmployee from '../controller/EmpController';


const router = Router();
router.post('/employee', ExportEmployee.createEmployee);
router.get('/employee', ExportEmployee.fetchAllEmployees);
router.delete('/employee/:id', ExportEmployee.destroyRecord);
router.patch('/employee/:id', ExportEmployee.updateEmployee);
router.patch('/employee/:id/activate', ExportEmployee.activateEmployee);
router.patch('/employee/:id/suspend', ExportEmployee.suspendEmployee);

// search routes
// router.get('/employee/search/:name', ExportEmployee.SeachByName);
// router.get('/employee/search/:position', ExportEmployee.SeachByPosition);
router.post('/employees/search', ExportEmployee.SeachByItem);
export default router;