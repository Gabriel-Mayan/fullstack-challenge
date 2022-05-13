import React from 'react';
import { useStores } from '../stores';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = React.lazy(async () => import('../pages/Login').then((m) => ({ default: m.Login })));
const Page404 = React.lazy(async () => import('../pages/Page404').then((m) => ({ default: m.Page404 })));
const CreateUser = React.lazy(async () => import('../pages/CreateUser').then((m) => ({ default: m.CreateUser })));
const UserPage = React.lazy(async () => import('../pages/UserPage').then((m) => ({ default: m.UserPage })));
const AdminPage = React.lazy(async () => import('../pages/AdminPage').then((m) => ({ default: m.AdminPage })));

const BaseView = React.lazy(async () => import('../bases/BaseView').then((m) => ({ default: m.BaseView })));

const ProtectedUserRoute = ({ redirectPath = '/login', children }) => {
	const { userStore: { userData } } = useStores();

	if (!userData || userData.userType === 'admin') {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Login />;
}

const ProtectedAdminRoute = ({ redirectPath = '/login', children }) => {
	const { userStore: { userData } } = useStores();

	if (!userData || userData.userType !== 'admin') {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Login />;
}

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="*" element={<BaseView component={<Page404 />} />} />

			<Route path="/login" element={<BaseView component={<Login />} />} />
			<Route path="/register" element={<BaseView component={<CreateUser />} />} />

			<Route path="/user" element={<ProtectedUserRoute><BaseView component={<UserPage />} /></ProtectedUserRoute>} />
			<Route path="/admin" element={<ProtectedAdminRoute><BaseView component={<AdminPage />} /></ProtectedAdminRoute>} />
		</Routes>

	);
}
