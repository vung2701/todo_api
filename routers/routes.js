'use strict';

import express from 'express';
import userRouter from './userRouter.js';
import todoRouter from './todoRouter.js';
const routes = express.Router();


routes.use('/user', userRouter);

routes.use('/todo', todoRouter);


export default routes;