import db from '../database/mongo.js';
const SchemaTypes = db.Schema.Types;

const revenueSchema = new db.Schema({
  description: { type: String, required: true },
  value: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  date: { type: String, required: true },
  company: { type: SchemaTypes.ObjectId, ref: 'Company', required: true }
});

export default db.model('Revenue', revenueSchema);