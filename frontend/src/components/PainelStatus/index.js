import React from 'react';
import Status from '../Status';

import RevenueImg from '../../assets/images/status-recipe.svg';
import ExpenseImg from '../../assets/images/status-expense.svg';
import BalanceImg from '../../assets/images/status-balance.svg';

import {ConvertMoney} from '../../functions/converts';

const PainelStatus = (props) => {
  return (
    <div className="columns status">
      <Status
        img={RevenueImg}
        color={{ backgroundColor: '#00A65A' }}
        title="RECEITA"
        value={ConvertMoney(props.revenue)}
      />

      <Status
        img={ExpenseImg}
        color={{ backgroundColor: '#DD4B39' }}
        title="DESPESA"
        value={ConvertMoney(props.expense)}
      />

      <Status
        img={BalanceImg}
        color={{ backgroundColor: '#4A84BF' }}
        title="SALDO"
        value={ConvertMoney(props.balance)}
      />
    </div>
  );
}

export default PainelStatus;