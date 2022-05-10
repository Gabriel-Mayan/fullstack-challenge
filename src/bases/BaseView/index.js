import './style.css';

import { cloneElement } from 'react';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function BaseView({ component }) {
  return (
    <div className='base'>
      <Header />
      {cloneElement(component)}
      <Footer />
    </div>
  );
}
