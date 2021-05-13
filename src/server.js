import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.listen(SERVER_PORT, (e) => {
  if (e) {
    console.log(e);
    return;
  }
  console.log(`Server is running: http://localhost:${SERVER_PORT}`);
});
