'use client'

import React, { useEffect } from 'react'
import { Admin, MediaLibrary } from 'react-bricks'

const AdminLogin: React.FC = () => {
  useEffect(() => {
    document.title = 'Media'
  }, [])

  return (
    <Admin>
      <MediaLibrary />
    </Admin>
  )
}

export default AdminLogin
