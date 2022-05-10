import './style.css';

import Links from '../../components/Generic/Links';

export function Page404() {
  return (
    <div>
      <h2> Ops! </h2>
      <Links destination='/' prefixLabel='Página não encontrada! ' label='Página inicial' />
    </div>
  );
}
