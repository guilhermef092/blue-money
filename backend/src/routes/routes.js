import express from 'express';

import CompanyController from '../controllers/companyController.js';
import RevenueController from '../controllers/revenueController.js';
import ExpenseController from '../controllers/expenseController.js';
import AccountController from '../controllers/accountController.js';
import middlewares from '../middlewares/auth.js';

const routes = express.Router();
const companyController = new CompanyController();
const revenueController = new RevenueController();
const expenseController = new ExpenseController();
const accountController = new AccountController();

routes.post('/register', companyController.register);
routes.post('/login', companyController.authentication);
routes.put('/forgot_password', companyController.forgotPassword);
routes.get('/company', middlewares, companyController.findOne);
routes.put('/profile', middlewares, companyController.profile);

routes.post('/revenue/new', middlewares, revenueController.create);
routes.put('/revenue/edit/:id', middlewares, revenueController.update);
routes.delete('/revenue/delete/:id', middlewares, revenueController.delete);
routes.get('/revenue/:id', middlewares, revenueController.findOne);
routes.get('/revenue/:month/:year', middlewares, revenueController.findAll);
routes.get('/revenue', middlewares, revenueController.find);

routes.post('/expense/new', middlewares, expenseController.create);
routes.put('/expense/edit/:id', middlewares, expenseController.update);
routes.delete('/expense/delete/:id', middlewares, expenseController.delete);
routes.get('/expense/:id', middlewares, expenseController.findOne);
routes.get('/expense/:month/:year', middlewares, expenseController.findAll);
routes.get('/expense', middlewares, expenseController.find);

routes.post('/account/new', middlewares, accountController.create);
routes.put('/account/edit/:id', middlewares, accountController.update);
routes.delete('/account/delete/:id', middlewares, accountController.delete);
routes.get('/account/:id', middlewares, accountController.findOne);
routes.get('/account/:month/:year', middlewares, accountController.findAll);

export default routes;