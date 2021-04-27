import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import api from '../../services/axios';

import Input from '../Input';
import Modal from '../Modal';

import { ConvertMonth, ConvertYear } from '../../functions/converts';

export function RegisterExpense(props) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('');

  const token = localStorage.getItem('token');

  function closeSet() {
    setDescription('');
    setValue('');
    setMonth('');
    setYear('');
    setDate('');
  }

  function removeClass() {
    var element = document.getElementById('modal');
    element.classList.remove('is-active');
    props.close();
  }

  function setDateMonthYear(e) {
    setDate(e)
    setMonth(ConvertMonth(e));
    setYear(ConvertYear(e));
  }

  async function handleRegister(e) {
    e.preventDefault();

    api.post(`/expense/new`, { description, value, month, year, date }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      swal('Lançamento de Despesa', res.data.message, 'success').then(() => {
        closeSet();
        removeClass();

      });
    }).catch(() => {
      swal('Ops...', 'Ocorreu um erro, tente novamente!', 'error');
    })
  }

  return (
    <Modal active={props.active} close={props.close} >
      <h1>NOVO LANÇAMENTO - DESPESA</h1>
      <form onSubmit={handleRegister}>
        <Input
          label="Descrição"
          name="description"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Valor R$"
          name="value"
          type="number"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Input
          label="Data"
          name="date"
          type="date"
          required
          value={date}
          onChange={(e) => setDateMonthYear(e.target.value)}
        />

        <button type="submit" className="button is-info is-large">Salvar</button>

      </form>
    </Modal>

  );
}

export function EditExpense(props) {
  const id = localStorage.getItem('idEdit');
  const token = localStorage.getItem('token');


  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('');

  function removeClass() {
    var element = document.getElementById('modal');
    element.classList.remove('is-active');
    props.close();
  }

  function setDateMonthYear(e) {
    setDate(e)
    setMonth(ConvertMonth(e));
    setYear(ConvertYear(e));
  }

  function handleEdit(e) {
    e.preventDefault();

    api.put(`/expense/edit/${id}`, { description, value, month, year, date }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      swal('Atualização de Despesa', res.data.message, 'success').then(() => {
        removeClass();
      });
    }).catch(() => {
      swal('Ops...', 'Ocorreu um erro, tente novamente!', 'error');
    })
  }

  useEffect(() => {
    api.get(`/expense/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setDescription(res.data.description);
      setValue(res.data.value);
      setDate(res.data.date);
      setDateMonthYear(res.data.date);
    });
  }, [id, token]);

  return (
    <Modal active={props.active} close={props.close} >
      <h1>EDITAR LANÇAMENTO - RECEITA</h1>

      <form onSubmit={handleEdit}>
        <Input
          label="Descrição"
          name="edit-description"
          type="text"
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <Input
          label="Valor R$"
          name="edit-value"
          type="number"
          required
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <Input
          label="Data"
          name="edit-date"
          type="date"
          required
          value={date}
          onChange={(e) => setDateMonthYear(e.target.value)}
        />

        <button type="submit" className="button is-info is-large">Salvar</button>

      </form>
    </Modal>
  );
}

export async function DeleteExpense(id, array, setArray) {
  const token = localStorage.getItem('token');

  try {
    await swal({
      title: 'Deseja realmente excluir essa DESPESA?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    })
      .then(willDelete => {
        if (willDelete) {
          api.delete(`/expense/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(() => {
            setArray(array.filter(item => item._id !== id));
            swal('Excluído', 'Despesa excluída com sucesso!', 'success')
          })
        } else {
          swal('Ops..', 'Exclusão de despesa cancelada!', 'error');
        }
      })

  } catch (error) {
    swal('Ops..', 'Erro ao excluir despesa, tente novamente!', 'error');
  }
}
