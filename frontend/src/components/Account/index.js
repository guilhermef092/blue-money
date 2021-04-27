import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import api from '../../services/axios';

import Input from '../Input';
import Modal from '../Modal';

import { ConvertMonth, ConvertYear } from '../../functions/converts';

export function RegisterAccount(props) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dueDate, setDueDate] = useState('');

  const token = localStorage.getItem('token');

  function closeSet() {
    setDescription('');
    setValue('');
    setMonth('');
    setYear('');
    setDueDate('');
  }

  function removeClass() {
    var element = document.getElementById('modal');
    element.classList.remove('is-active');
    props.close();
  }

  function setDateMonthYear(e) {
    setDueDate(e)
    setMonth(ConvertMonth(e));
    setYear(ConvertYear(e));
  }

  async function handleRegister(e) {
    e.preventDefault();

    api.post(`/account/new`, { description, value, month, year, dueDate }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      swal('Lançamento de Conta á Pagar', res.data.message, 'success').then(() => {
        closeSet();
        removeClass();

      });
    }).catch(() => {
      swal('Ops...', 'Ocorreu um erro, tente novamente!', 'error');
    })
  }

  return (
    <Modal active={props.active} close={props.close} >
      <h1>NOVO LANÇAMENTO - CONTA A PAGAR</h1>
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
          label="Data de Vencimento"
          name="date"
          type="date"
          required
          value={dueDate}
          onChange={(e) => setDateMonthYear(e.target.value)}
        />

        <button type="submit" className="button is-info is-large">Salvar</button>

      </form>
    </Modal>

  );
}

export function EditAccount(props) {
  const id = localStorage.getItem('idEdit');
  const token = localStorage.getItem('token');


  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dueDate, setDueDate] = useState('');

  function removeClass() {
    var element = document.getElementById('modal');
    element.classList.remove('is-active');
    props.close();
  }

  function setDateMonthYear(e) {
    setDueDate(e)
    setMonth(ConvertMonth(e));
    setYear(ConvertYear(e));
  }

  function handleEdit(e) {
    e.preventDefault();

    api.put(`/account/edit/${id}`, { description, value, month, year, dueDate }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      swal('Atualização de Conta a Pagar', res.data.message, 'success').then(() => {
        removeClass();
      });
    }).catch(() => {
      swal('Ops...', 'Ocorreu um erro, tente novamente!', 'error');
    })
  }

  useEffect(() => {
    api.get(`/account/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setDescription(res.data.description);
      setValue(res.data.value);
      setDueDate(res.data.dueDate);
      setDateMonthYear(res.data.dueDate);
    });
  }, [id, token]);

  return (
    <Modal active={props.active} close={props.close} >
      <h1>EDITAR LANÇAMENTO - CONTA A PAGAR</h1>

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
          label="Data de Vencimento"
          name="edit-date"
          type="date"
          required
          value={dueDate}
          onChange={(e) => setDateMonthYear(e.target.value)}
        />

        <button type="submit" className="button is-info is-large">Salvar</button>

      </form>
    </Modal>
  );
}

export async function DeleteAccount(id, array, setArray) {
  const token = localStorage.getItem('token');

  try {
    await swal({
      title: 'Deseja realmente excluir essa CONTA A PAGAR?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    })
      .then(willDelete => {
        if (willDelete) {
          api.delete(`/account/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(() => {
            setArray(array.filter(item => item._id !== id));
            swal('Excluído', 'Conta a Pagar excluída com sucesso!', 'success')
          })
        } else {
          swal('Ops..', 'Exclusão de conta a pagar cancelada!', 'error');
        }
      })

  } catch (error) {
    swal('Ops..', 'Erro ao excluir conta a pagar, tente novamente!', 'error');
  }
}
