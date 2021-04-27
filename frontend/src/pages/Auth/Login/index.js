import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../services/axios';

import PageLogo from '../../../components/PageLogo';
import Link from '../../../components/Link';
import Input from '../../../components/Input';
import Form from '../../../components/Form';

import LogoImg from '../../../assets/images/bluemoney.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    api.post('login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        swal('Login', res.data.message, 'success').then(() => history.push('/dashboard'));
      })
      .catch(error => {
        swal('Ocorreu um erro', error.response.data.message, 'error');
      });
  }

  return (
    <div id="page-login">
      <div className="columns">

        <PageLogo logo={LogoImg} />

        <Form title="FAÇA SEU LOGIN">
          <form onSubmit={handleLogin}>
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
              minLength={6}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button type="submit" className="button is-info is-large is-fullwidth">Entrar</button>

          </form>

          <Link to="/register" title="Não tem uma conta? Cadastre-se aqui" />
          <Link to="/forgot-password" title="Esqueci minha senha" />

        </Form>

      </div>
    </div>
  );
}

export default Login;