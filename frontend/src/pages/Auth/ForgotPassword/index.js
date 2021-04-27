import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../services/axios';

import PageLogo from '../../../components/PageLogo';
import Input from '../../../components/Input';
import Form from '../../../components/Form';

import LogoImg from '../../../assets/images/bluemoney.svg';

function ForgotPassword() {
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleForgotPassword(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      swal('Ocorreu um erro', 'Senha são diferentes', 'error');
      return;
    }

    api.put('/forgot_password', { cnpj, email, password })
      .then(res => {
        swal('Esqueci Senha', res.data.message, 'success').then(() => history.push('/login'));
      })
      .catch(error => {
        swal('Ocorreu um erro', error.response.data.message, 'error');
      });
  }

  const history = useHistory();
  return (
    <div id="page-forgotpassword">
      <div className="columns">

        <PageLogo logo={LogoImg} />

        <Form title="ESQUECI SENHA">
          <form onSubmit={handleForgotPassword}>
            <Input
              label="CNPJ"
              name="cnpj"
              type="number"
              required
              value={cnpj}
              onChange={e => setCnpj(e.target.value)}
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
              label="Nova Senha"
              name="newpassword"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Input
              label="Confirme Senha"
              name="confirmpassord"
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <button type="submit" className="button is-info is-large is-fullwidth">Confirmar</button>

          </form>
        </Form>

      </div>
    </div>
  );
}

export default ForgotPassword;