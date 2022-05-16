import { useLocalStorage } from 'react-use';

export function useUser() {
	const [token, setToken, removeToken] = useLocalStorage('token');
	const [user, setUser, removerUser] = useLocalStorage('user');

	function handleClearUser() {
		removeToken();
		removerUser();
	}

	return {
		token,
		setToken,
		user,
		setUser,
		handleClearUser,
	};
}
