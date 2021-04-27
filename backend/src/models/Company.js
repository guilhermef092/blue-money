import db from '../database/mongo.js';
import bcrypt from 'bcrypt';

const companySchema = new db.Schema({
  cnpj: { type: String, unique: true, required: true },
  companyName: { type: String, required: true },
  responsibleName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, select: false, },
  createdAt: { type: Date, default: Date.now }
});

companySchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export default db.model('Company', companySchema);
