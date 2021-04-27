import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', () => console.error('STAUS: ERROR'));
mongoose.connection.once('open', () => console.log('STAUS: CONECTADO'));

export default mongoose;