
import { Router } from 'express';

import ExportEmployee from '../controller/AuthController';


const router = Router();
router.post('/signup', ExportEmployee.SignupEmployee);
router.post('/login', ExportEmployee.loginUser);

export default router;
