'use client'

import React, { useEffect } from 'react'
import { Admin, Playground } from 'react-bricks'

const AdminLogin: React.FC = () => {
  useEffect(() => {
    document.title = 'Playground'
  }, [])

  return (
    <Admin>
      <Playground />
    </Admin>
  )
}

export default AdminLogin
