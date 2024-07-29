'use client'

import React, { useEffect } from 'react'
import { Admin, AppSettings } from 'react-bricks'

const AdminLogin: React.FC = () => {
  useEffect(() => {
    document.title = 'App Settings'
  }, [])

  return (
    <Admin>
      <AppSettings />
    </Admin>
  )
}

export default AdminLogin
