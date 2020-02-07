import { Router } from 'express';
import AnimalController from './app/controllers/AnimalController';

const routes = new Router();

routes.post('/animals', AnimalController.store);
routes.get('/animals/:id', AnimalController.index);
routes.put('/animals/:id', AnimalController.update);

export default routes;
