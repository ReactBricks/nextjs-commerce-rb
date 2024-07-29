'use client'

import React, { useEffect } from 'react'
import { Admin, Login } from 'react-bricks'

const AdminLogin: React.FC = () => {
  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <Admin isLogin>
      <Login />
    </Admin>
  )
}

export default AdminLogin
