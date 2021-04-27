import db from '../models/Revenue.js';

export default class RevenueController {

  async create(req, res) {
    const { description, value, month, year, date } = req.body;

    try {
      const revenue = await db.create({ description, value, month, year, date, company: req.companyId });
      return res.status(200).send({ message: 'Receita cadastrada com sucesso!', revenue });

    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao cadastrar a receita, tente novamente.' });
    }
  }

  async update(req, res) {
    const id = req.params.id;

    if (!req.body) {
      return res.status(400).send({ message: 'Existe algum dado vazios para atualizar!' });
    }

    try {
      const revenue = await db.findOneAndUpdate({ "_id": id, "company": req.companyId }, req.body, { new: true });

      if (!revenue) {
        return res.status(404).send({ message: 'Receita não encontrada' });
      }
      return res.status(200).send({ message: 'Receita atualizada com sucesso', revenue });

    } catch (error) {
      return res.status(500).send({ message: "Error ao atualizar receita id: " + id });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const revenue = await db.findOneAndDelete({ "_id": id, "company": req.companyId });

      if (!revenue) {
        return res.status(404).send({ message: 'Receita não encontrada!' });
      }

      return res.status(200).send({ message: 'Receita excluída com sucesso!' });

    } catch (error) {
      return res.status(500).send({ message: 'Não foi possível excluir a receita de id: ' + id });
    }
  }

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const revenue = await db.findOne({ "_id": id, "company": req.companyId });

      if (revenue.length == 0) {
        return res.status(404).send({ message: `Receita - ${id} -  não encontrada` });
      }

      return res.status(200).send(revenue);

    } catch (error) {
      return res.status(500).send({ message: `Receita ID: ${id} - não foi localizado!` });
    }
  }

  async findAll(req, res) {
    const month = req.params.month;
    const year = req.params.year;

    try {
      const revenue = await db.find({ "company": req.companyId, "month": month, "year": year });
      return res.status(200).send(revenue);

    } catch (error) {
      return res.status(500).send({ message: 'Error, tente novamente!' });
    }
  }

  async find(req, res) {
    let sumRevenue = 0;
    try {
      const revenue = await db.find({ "company": req.companyId });

      revenue.forEach(itens => {
        sumRevenue += itens.value;
      });
      return res.status(200).send({ sumRevenue });

    } catch (error) {
      return res.status(500).send({ message: 'Error, tente novamente!' });
    }
  }

} 