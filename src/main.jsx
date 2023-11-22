import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Morning from './pages/Morning.jsx'
import Movement from './pages/Movement.jsx'
import Nutrition from './pages/Nutrition.jsx'
import Relationships from './pages/Relationships.jsx'
import Sleep from './pages/Sleep.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Signout from './pages/Signout.jsx'

import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
        <Route element={<AuthRequired />}>
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/movement" element={<Movement />} />
          <Route path="/morning" element={<Morning />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/relationships" element={<Relationships />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
