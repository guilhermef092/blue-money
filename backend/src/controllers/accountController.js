import db from '../models/Account.js';

export default class AccountController {

  async create(req, res) {
    const { description, value, month, year, dueDate } = req.body;

    try {
      const account = await db.create({ description, value, month, year, dueDate, company: req.companyId });
      return res.status(200).send({ message: 'Conta a pagar cadastrada com sucesso!', account });

    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao cadastrar conta a pagar, tente novamente.' });
    }
  }

  async update(req, res) {
    const id = req.params.id;

    if (!req.body) {
      return res.status(404).send({ message: 'Existe algum dado vazios para atualizar!' });
    }

    try {
      const account = await db.findOneAndUpdate({ "_id": id, "company": req.companyId }, req.body, { new: true });

      if (!account) {
        return res.status(404).send({ message: 'Conta a pagar não encontrada' });
      }
      return res.status(200).send({ message: 'Conta a pagar atualizada com sucesso', account });

    } catch (error) {
      return res.status(500).send({ message: "Error ao atualizar conta a pagar id: " + id });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const account = await db.findOneAndDelete({ "_id": id, "company": req.companyId });

      if (!account) {
        return res.status(404).send({ message: 'Conta a pagar não encontrada!' });
      }

      return res.status(200).send({ message: 'Conta a pagar excluída com sucesso!' });

    } catch (error) {
      return res.status(500).send({ message: 'Não foi possível excluir conta a pagar de id: ' + id });
    }
  }

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const account = await db.findOne({ "_id": id, "company": req.companyId });

      if (account.length == 0) {
        return res.status(404).send({ message: `Conta a pagar - ${id} -  não encontrada` });
      }

      return res.status(200).send(account);

    } catch (error) {
      return res.status(500).send({ message: `Conta a pagar ID: ${id} - não foi localizado!` });
    }
  }

  async findAll(req, res) {
    const month = req.params.month;
    const year = req.params.year;

    try {
      const account = await db.find({ "company": req.companyId, "month": month, "year": year });
      return res.status(200).send(account);

    } catch (error) {
      return res.status(500).send({ message: 'Error, tente novamente' });
    }
  }
}