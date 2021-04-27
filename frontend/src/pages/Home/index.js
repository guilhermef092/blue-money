import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';

import logoBlueMoney from '../../assets/images/bluemoney.svg';
import graphic from '../../assets/images/grafico.svg'
import recipe from '../../assets/images/recipe.svg';
import expense from '../../assets/images/expense.svg';

import './styles.css';

function Home() {
  return (
    <div id="page-home">
      <header className="header-home">
        <Link to="/register" className="header-link">CRIAR CONTA</Link>
        <Link to="/login" className="header-link">LOGIN</Link>
      </header>

      <section className="content-home">
        <div className="logo-container">
          <img src={logoBlueMoney} alt="BlueMoney" />
        </div>

        <div className="info-container">
          <h2>Não permita que suas contas fiquem no vermelho, tenha as receitas e despesas, sempre à mão.</h2>
          <a href="#info-home">SAIBA MAIS</a>
        </div>

        <div className="graphic-container">
          <img src={graphic} alt="Gráfico" />
        </div>
      </section>

      <section id="info-home" className="info-home">
        <h2>FLUXO DE CAIXA</h2>

        <div className="card-page">
          <Card logo={recipe} title="RECEITAS" description="As receitas são os bens (dinheiro) que é lucrado das atividades da empresa. Ou seja, todos os valores que a empresa ganha com a vendas." />

          <Card logo={expense} title="DESPESAS" description="As despesas são os valores desembolsados na manutenção do dia a dia da empresa. É o dinheiro que precisa ser gasto para que o negócio funcione." />

        </div>
      </section>

      <section className="container-informative">

        <p><b>Fluxo de Caixa</b> é um instrumento de controle financeiro que permite acompanhar as movimentações financeiras de uma empresa, através de uma relação das entradas (receitas) e saídas (despesas) realizadas em períodos determinados.</p>

      </section>

      <footer className="footer-home">
        <Link to="/register" className="account">REGISTRE AQUI GRÁTIS</Link>
      </footer>

    </div>
  );
}

export default Home;