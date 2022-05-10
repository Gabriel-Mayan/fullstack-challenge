import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = React.lazy(async () => import('../pages/Login').then((m) => ({ default: m.Login })));
const Page404 = React.lazy(async () => import('../pages/Page404').then((m) => ({ default: m.Page404 })));
const CreateUser = React.lazy(async () => import('../pages/CreateUser').then((m) => ({ default: m.CreateUser })));

const BaseView = React.lazy(async () => import('../bases/BaseView').then((m) => ({ default: m.BaseView })));

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<BaseView component={<Login />} />} />
      <Route path="/register" element={<BaseView component={<CreateUser />} />} />
      <Route path="*" element={<BaseView component={<Page404 />} />} />
    </Routes>
  );
}
