import express from 'express';
const cors = require('cors');
import {  
    registrationController, 
    loginController 
} from '../controllers';

import authHandler from '../middlewares/auth-handler';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/users', registrationController.post);
router.post('/login', loginController.post);
router.use(authHandler);

export default router;