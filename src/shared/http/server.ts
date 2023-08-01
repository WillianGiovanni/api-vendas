import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(2999, () => {
  console.log('Server running on port 2999.');
});
