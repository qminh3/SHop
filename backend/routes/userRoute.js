import express from 'express';
import { loginUser, registerUser,adminLogin,getMyInfo,getMyNameEmailPassword} from '../controllers/userController.js'
import authUser from '../middleware/auth.js'


const userRouter = express.Router();
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getMyInfo',authUser, getMyInfo)
userRouter.get('/getMyNameEmailPassword',authUser, getMyNameEmailPassword)

// Admin routes
userRouter.post('/admin', adminLogin)


export default userRouter;