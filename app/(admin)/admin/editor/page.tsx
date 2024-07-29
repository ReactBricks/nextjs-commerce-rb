'use client'

import React, { useEffect } from 'react'
import { Admin, Editor } from 'react-bricks'

const AdminLogin: React.FC = () => {
  useEffect(() => {
    document.title = 'Editor'
  }, [])

  return (
    <Admin>
      <Editor />
    </Admin>
  )
}

export default AdminLogin
