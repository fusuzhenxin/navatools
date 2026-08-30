'use client'

import { AuthProvider } from '../context/AuthContext.jsx'
import LoginModal from './LoginModal.jsx'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <LoginModal />
    </AuthProvider>
  )
}
