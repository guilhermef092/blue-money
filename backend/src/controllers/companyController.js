import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth.json';
import db from '../models/Company.js';

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 43200
  });
}

export default class CompanyController {

  async register(req, res) {
    const { cnpj, email } = req.body;

    try {
      const checkCNPJ = await db.findOne({ cnpj });
      if (checkCNPJ)
        return res.status(404).json({ message: 'CNJP já possui cadastro!' });

      const checkEmail = await db.findOne({ email });
      if (checkEmail)
        return res.status(404).json({ message: 'Esse email já possui cadastro!' });

      const company = await db.create(req.body);
      company.password = undefined;
      return res.status(200).json({ message: 'Cadastro realizado com sucesso!', company });

    } catch (error) {
      return res.status(500).json({ message: 'Falha ao fazer cadastro da empresa' });
    }
  }

  async authentication(req, res) {
    const { email, password } = req.body;

    try {
      const company = await db.findOne({ email }).select('+password');
      if (!company)
        return res.status(404).json({ message: 'Empresa não cadastrada!' });

      const checkPassword = await bcrypt.compare(password, company.password);
      if (!checkPassword)
        return res.status(404).json({ message: 'Senha incorreta, tente novamente!' });

      company.password = undefined;
      return res.status(200).json({ message: 'Login com sucesso!', company, token: generateToken({ id: company.id }) });

    } catch (error) {
      return res.status(500).json({ error: 'Falha na autenticação!' });
    }
  }

  async forgotPassword(req, res) {
    const { cnpj, email, password } = req.body;

    try {
      const company = await db.findOne({ email, cnpj });

      if (!company)
        return res.status(404).json({ message: 'CNPJ e/ou Email não encontrado!' });

      if (company.email !== email)
        return res.status(404).json({ message: 'Email incorreto!' });

      company.password = password;
      await company.save();
      return res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (error) {
      return res.status(500).json({ message: 'Falha ao atualizar senha!' });
    }
  }

  async findOne(req, res) {

    try {
      const company = await db.findOne({ "_id": req.companyId }).select('+password');
      return res.status(200).json(company);

    } catch (error) {
      return res.status(500).json({ error: 'Falha ao buscar informações' });
    }
  }

  async profile(req, res) {
    const { cnpj, companyName, responsibleName, email, password } = req.body;

    try {
      const company = await db.findOne({ "_id": req.companyId }).select('+password');

      if (company.email !== email) {
        const checkEmail = await db.findOne({ email });
        if (checkEmail) {
          return res.status(404).json({ message: 'Email já possui cadastro!' });
        }
      }

      if (company.cnpj !== cnpj) {
        const checkCNPJ = await db.findOne({ cnpj });
        if (checkCNPJ) {
          return res.status(404).json({ message: 'CNPJ já cadastrado' });
        }
      }

      company.cnpj = cnpj;
      company.companyName = companyName;
      company.responsibleName = responsibleName;
      company.email = email;
      company.password = password;

      await company.save();
      return res.status(200).json({ message: 'Dados atualizados com sucesso' });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Falha ao atualizar dados da empresa' });
    }
  }
}