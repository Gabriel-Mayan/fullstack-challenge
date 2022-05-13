import './style.css';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Links from '../../components/Generic/Links';
import Button from '../../components/Generic/Button';

import api from '../../services/api';

export function CreateUser() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	const onSubmit = ({ email, password, confimPassword, }) => {
		api.post('/create_user', { email, password, confimPassword, }).then(response => {
			if (response.status !== 200)
				console.log('Falha ao efetuar o cadastro');

			//TODO colocar uma notificação de sucesso de cadastro

			navigate('/login')
		}).catch(err => {
			if (err.request)
				console.log('error', err.request.response);
		});
	}

	return (
		<div className='background'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Cadastro</h1>
				<input className='campo' type="text" placeholder="Email" {...register('email', { required: true })} />
				<input className='campo' type="password" placeholder="Senha" {...register('password', { required: true })} />
				<input className='campo' type="password" placeholder="Confime a Senha" {...register('confimPassword', { required: true })} />
				<Button className='btn' type="submit" label='Cadastrar' />
				<Links destination='/login' prefixLabel='Já possui uma conta? ' label='Login' />
			</form>
		</div>
	);
}
