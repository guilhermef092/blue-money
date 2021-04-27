import db from '../models/Expense.js';

export default class ExpenseController {

  async create(req, res) {
    const { description, value, month, year, date } = req.body;

    try {
      const expense = await db.create({ description, value, month, year, date, company: req.companyId });
      return res.status(200).send({ message: 'Despesa cadastrada com sucesso!', expense });

    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao cadastrar a despesa, tente novamente.' })
    }
  }

  async update(req, res) {
    const id = req.params.id;

    if (!req.body) {
      return res.status(404).send({ message: 'Existe algum dado vazios para atualizar!' });
    }

    try {
      const expense = await db.findOneAndUpdate({ "_id": id, "company": req.companyId }, req.body, { new: true });

      if (!expense) {
        return res.status(404).send({ message: 'Despesa não encontrada' });
      }

      return res.status(200).send({ message: 'Despesa atualizada com sucesso', expense });

    } catch (error) {
      return res.status(500).send({ message: "Error ao atualizar despesa id: " + id });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const expense = await db.findOneAndRemove({ "_id": id, "company": req.companyId });

      if (!expense) {
        return res.status(404).send({ message: 'Despesa não encontrada!' });
      }

      return res.status(200).send({ message: 'Despesa excluída com sucesso!' });

    } catch (error) {
      return res.status(500).send({ message: 'Não foi possível excluir a despesa de id: ' + id });
    }
  }

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const expense = await db.findOne({ "_id": id, "company": req.companyId });

      if (expense.length == 0) {
        return res.status(404).send({ message: `Despesa - ${id} -  não encontrada` });
      }

      return res.status(200).send(expense);

    } catch (error) {
      return res.status(500).send({ message: `Despesa ID: ${id} - não foi localizado!` });
    }
  }

  async findAll(req, res) {
    const month = req.params.month;
    const year = req.params.year;

    try {
      const expense = await db.find({ "company": req.companyId, "month": month, "year": year });
      return res.status(200).send(expense);

    } catch (error) {
      return res.status(500).send({ message: 'Error, tente novamente!' });
    }
  }

  async find(req, res) {
    let sumExpense = 0;
    try {
      const expense = await db.find({ "company": req.companyId });

      expense.forEach(itens => {
        sumExpense += itens.value;
      });
      return res.status(200).send({ sumExpense });

    } catch (error) {
      return res.status(500).send({ message: 'Error, tente novamente!' });
    }
  }

}