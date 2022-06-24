import express, { Application, Request, Response } from 'express';
import { Router } from './routes';

export const app: Application = express();
const port = process.env.PORT || 3000;

app.use('/api', Router);

app.get('/', (req: Request, res: Response): void => {
    res.send('AKASI');
});

app.listen(port, () => {
    console.log('Server is on Port ' + port);
});
