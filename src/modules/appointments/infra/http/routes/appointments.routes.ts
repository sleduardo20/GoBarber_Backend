import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAutheticated);

/* appointmentsRouter.get('/', async (request, reponse) => {
  const appointments = await appointmentsRepository.find();

  return reponse.json(appointments);
}); */

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
