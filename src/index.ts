import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import { config } from './config';
import userRouter from './routes/user.routes';
import { pool } from './config';

const app: Application = express();

/* Middlewares */
app.use(express.json());
app.set('port', config.PORT);
app.use(cors());

/* Routes */
app.use('/user', userRouter);

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Bienvenido a la API REST de la Plataforma del MEP, desarrollada en NodeJS y Typescript',
  });
});

/* Server */
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')} 🚀`);
  console.log(`http://localhost:${app.get('port')}`);
});

// ✈️ 🏢🏢
