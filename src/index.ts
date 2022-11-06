import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config';
import userRouter from './routes/user.routes';

const app: Application = express();

/* Middlewares */
app.use(cors);
app.use(express.json());
app.set('port', config.PORT);

/* Routes */
app.use('/user', userRouter);

/* Server */
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')} 🚀`);
  console.log(`http://localhost:${app.get('port')}`);
});
