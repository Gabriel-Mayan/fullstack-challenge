import './style.css';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Links from '../../components/Generic/Links';
import Button from '../../components/Generic/Button';

import { useStores } from '../../stores';

import api from '../../services/api';

export function Login() {
	const { register, handleSubmit } = useForm();
	const { userStore: { setUser, setToken } } = useStores();

	let navigate = useNavigate();

	const onSubmit = async ({ email, password }) => {
		api.post('/login', { email, password }).then(response => {
			if (response.status !== 200)
				console.log('Falha ao efetuar o login');

			const { data: { token, user } } = response;

			setToken(token);
			setUser(user);

			const route = user.userType === 'admin' ? 'admin' : 'user';
			navigate(`/${route}`);
		}).catch(err => {
			if (err.request)
				console.log('error', err.request.response);
		});
	}

	return (
		<div className='background'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Login</h1>
				<input className='campo' type="text" placeholder="Email" {...register('email', { required: true })} />
				<input className='campo' type="password" placeholder="Senha" {...register('password', { required: true })} />
				<Button className='btn' type="submit" label='Entrar' />
				<Links destination='/register' prefixLabel='Primeira vez aqui? ' label='Cadastre-se' />
			</form>
		</div>
	);
}
