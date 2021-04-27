import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../services/axios';

import PageLogo from '../../../components/PageLogo';
import Input from '../../../components/Input';
import Form from '../../../components/Form';

import LogoImg from '../../../assets/images/bluemoney.svg';

function Register() {
  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      swal('Ocorreu um erro', 'Senha são diferentes', 'error');
      return;
    }

    api.post('register', { cnpj, companyName, responsibleName, email, password })
      .then(res => {
        swal('Cadastro', res.data.message, 'success').then(() => history.push('/login'));
      })
      .catch(error => {
        swal('Ocorreu um erro', error.response.data.message, 'error');
      });
  }

  return (
    <div id="page-register">
      <div className="columns">

        <PageLogo logo={LogoImg} />

        <Form title="FAÇA SEU CADASTRO">
          <form onSubmit={handleRegister}>
            <Input
              label="CNPJ"
              name="cnpj"
              type="number"
              required
              value={cnpj}
              onChange={e => setCnpj(e.target.value)}
            />

            <Input
              label="Nome da Empresa"
              name="companyname"
              type="text"
              required
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
            />

            <Input
              label="Nome do Responsável"
              name="responsibleName"
              type="text"
              required
              value={responsibleName}
              onChange={e => setResponsibleName(e.target.value)}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              label="Senha"
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Input
              label="Confirme Senha"
              name="confirmpassword"
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <button type="submit" className="button is-info is-large is-fullwidth">Cadastrar</button>

          </form>
        </Form>

      </div>
    </div>
  );
}

export default Register;