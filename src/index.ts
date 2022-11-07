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
  const response = await pool.query('SELECT * FROM tb_users');
  return res.json(response.rows);
});

/* Server */
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')} 🚀`);
  console.log(`http://localhost:${app.get('port')}`);
});

// ✈️ 🏢🏢
