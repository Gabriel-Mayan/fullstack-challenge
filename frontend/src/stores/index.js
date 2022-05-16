/* eslint-disable react/destructuring-assignment */
import { useUser } from './userStore';
import { createContext, useContext } from 'react';

const storesCtx = createContext(null);

export function useStores() {
	return useContext(storesCtx);
}

export function StoresProvider(props) {
	const userStore = useUser();

	return (
		<storesCtx.Provider value={{ userStore }}>
			{props.children}
		</storesCtx.Provider>
	);
}
