import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../services/axios';

import Menu from '../../../components/Menu';
import Button from '../../../components/Button';
import PainelStatus from '../../../components/PainelStatus';
import Select from '../../../components/Select';

import LogoImg from '../../../assets/images/bluemoney.svg';
import LogoutImg from '../../../assets/images/logout.svg';

import { ConvertDate, ConvertMoney } from '../../../functions/converts';

function Dashboard() {
  const [type, setType] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [profile, setProfile] = useState([]);
  const [array, setArray] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [expense, setExpense] = useState([]);

  const token = localStorage.getItem('token');
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/login');
  }

  useEffect(() => {
    // SET PROFILE
    api.get('/company', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setProfile(res.data);
    }).catch(() => {
      swal('Token Expirado', 'Realize o login novamente.', 'error').then(() => history.push('/login'));
    });

    // SET DICE REVENUE
    api.get('/revenue', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setRevenue(res.data.sumRevenue);
    });

    // SET DICE EXPENSE
    api.get('/expense', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setExpense(res.data.sumExpense);
    });

    // SET FILTER TABLE
    if (type !== '' && month !== '' && year !== '') {
      api.get(`/${type}/${month}/${year}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        res.data.sort((a, b) => {
          return (a.date || a.dueDate) < (b.date || b.dueDate) ? -1
            : (a.date || a.dueDate) > (b.date || b.dueDate) ? 1
              : 0
        });
        setArray(res.data);
      });
    }
  }, [history, token, profile, type, month, year]);

  const balance = revenue - expense;

  // SUM TOTAL
  let sumValues = 0;
  array.forEach(item => {
    sumValues += item.value;
  });

  return (
    <div id="page-dashboard">
      <div className="columns">
        <div className="column container-menu">
          <Menu
            logo={LogoImg}
            logout={LogoutImg}
            user={profile.companyName}
            OnClickFunc={handleLogout}
          >
            <Button to="/dashboard" title="DASHBOARD" />
            <Button to="/revenue" title="RECEITA" />
            <Button to="/expense" title="DESPESA" />
            <Button to="/account" title="CONTAS Á PAGAR" />
            <Button to="/" title="RELATÓRIO" />
          </Menu>
        </div>

        <div className="column container-painel">

          <PainelStatus revenue={revenue} expense={expense} balance={balance} />

          <div className="painel-title">
            <label htmlFor="">DASHBOARD</label>
          </div>

          <div className="painel-form">
            <Select
              name="type"
              label="Tipo"
              value={type}
              onChange={e => { setType(e.target.value) }}
              options={
                [
                  { value: 'revenue', label: 'Receita' },
                  { value: 'expense', label: 'Despesa' },
                  { value: 'account', label: 'Contas á Pagar' }
                ]
              }
            />

            <Select
              name="month"
              label="Mês"
              value={month}
              onChange={(e) => { setMonth(e.target.value) }}
              options={
                [
                  { value: '01', label: 'Janeiro' },
                  { value: '02', label: 'Fevereiro' },
                  { value: '03', label: 'Março' },
                  { value: '04', label: 'Abril' },
                  { value: '05', label: 'Maio' },
                  { value: '06', label: 'Junho' },
                  { value: '07', label: 'Julho' },
                  { value: '08', label: 'Agosto' },
                  { value: '09', label: 'Setembro' },
                  { value: '10', label: 'Outubro' },
                  { value: '11', label: 'Novembro' },
                  { value: '12', label: 'Dezembro' },
                ]
              }
            />

            <Select
              name="year"
              label="Ano"
              value={year}
              onChange={(e) => { setYear(e.target.value) }}
              options={
                [
                  { value: '2018', label: '2018' },
                  { value: '2019', label: '2019' },
                  { value: '2020', label: '2020' },
                ]
              }
            />
          </div>

          <div className="painel-value">
            <label htmlFor="">Valor Total:  {ConvertMoney(sumValues)} </label>
          </div>

          <div className="painel-table">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  {type === 'account' ?
                    <th>Data de Vencimento</th>
                    :
                    <th>Data</th>
                  }
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>

              <tbody>
                {array.map(dice => {
                  return (
                    <tr key={dice._id}>
                      <td>{ConvertDate(dice.date || dice.dueDate)} </td>
                      <td>{dice.description}</td>
                      <td>{ConvertMoney(dice.value)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;