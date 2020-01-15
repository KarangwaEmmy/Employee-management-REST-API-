
import { Router } from 'express';
import ImportEmployee from '../controller/AuthController';


const router = Router();
router.post('/signup',  ImportEmployee.SignupEmployee);
router.post('/login', ImportEmployee.LoginEMployee);

export default router;
