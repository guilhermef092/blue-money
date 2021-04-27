import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../services/axios';

import Menu from '../../../components/Menu';
import Button from '../../../components/Button';
import PainelStatus from '../../../components/PainelStatus';
import Select from '../../../components/Select';
import { DeleteRevenue, RegisterRevenue, EditRevenue } from '../../../components/Revenue';

import LogoImg from '../../../assets/images/bluemoney.svg';
import LogoutImg from '../../../assets/images/logout.svg';

import { ConvertDate, ConvertMoney } from '../../../functions/converts';

function Revenue() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [profile, setProfile] = useState([]);
  const [array, setArray] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [expense, setExpense] = useState([]);
  const [modal, setModal] = useState('');
  const [editModal, setEditModal] = useState('');

  const token = localStorage.getItem('token');
  const history = useHistory();

  function showModal() {
    setModal('is-active');
  }

  function closeModal() {
    setModal('');
  }

  function showEditModal() {
    setEditModal('is-active');
  }

  function closeEditModal() {
    setEditModal('');
  }

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

    //SET FILTER TABLE
    if (month !== '' && year !== '') {
      api.get(`/revenue/${month}/${year}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        res.data.sort((a, b) => {
          return a.date < b.date ? -1
            : a.date > b.date ? 1
              : 0
        });
        setArray(res.data);
      });
    }
  }, [history, token, profile, month, year]);

  const balance = revenue - expense;

  // SUM TOTAL
  let sumValues = 0;
  array.forEach(item => {
    sumValues += item.value;
  });

  return (
    <div id="page-revenue">
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
            <label htmlFor="">RECEITA</label>
          </div>

          <div className="painel-form">
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

          <div className="painel-button">
            <button onClick={showModal} className="button is-large is-success">Adicionar Novo Lançamento</button>
          </div>


          <div className="painel-value">
            <label htmlFor="">Valor Total: {ConvertMoney(sumValues)} </label>
          </div>

          <div className="painel-table">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {array.map(dice => {
                  return (
                    <tr key={dice._id}>
                      <td>{ConvertDate(dice.date)}</td>
                      <td>{dice.description}</td>
                      <td>{ConvertMoney(dice.value)}</td>
                      <td>
                        <div className="table-button">
                          <button onClick={() => {
                            showEditModal();
                            localStorage.setItem('idEdit', dice._id);
                          }} className="button is-warning is-medium">Editar</button>

                          <button onClick={() => DeleteRevenue(dice._id, array, setArray)} className="button is-danger is-medium">Excluir</button>
                        </div>
                      </td>


                    </tr>

                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RegisterRevenue active={modal} close={closeModal} />
      <EditRevenue active={editModal} close={closeEditModal} />

    </div >
  );
}

export default Revenue;