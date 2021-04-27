export function ConvertDate(dados) {
  return dados.toString().split("-").reverse().join("/")//ex out: "18/01/10"
}

export function ConvertMoney(money) {
  const moneyFormat = money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return moneyFormat;
}

export function ConvertMonth(date) {
  const month = date.toString().split('-');

  return month[1];
}

export function ConvertYear(date) {
  const year = date.toString().split('-')
  return year[0];
}
