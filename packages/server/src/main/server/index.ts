import dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at port: ${process.env.PORT}`);
});
