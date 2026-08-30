'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_KEY = 'novatools.user'
const FAV_KEY = 'novatools.favorites'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY)
      const fav = localStorage.getItem(FAV_KEY)
      if (saved) setUser(JSON.parse(saved))
      if (fav) setFavorites(JSON.parse(fav))
    } catch {
      /* ignore broken local data */
    }
  }, [])

  const login = (nextUser) => {
    setUser(nextUser)
    localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser))
    setLoginOpen(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_KEY)
  }

  const toggleFavorite = (slug) => {
    if (!user) {
      setLoginOpen(true)
      return
    }
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      localStorage.setItem(FAV_KEY, JSON.stringify(next))
      return next
    })
  }

  const value = useMemo(
    () => ({ user, login, logout, favorites, toggleFavorite, loginOpen, setLoginOpen }),
    [user, favorites, loginOpen],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
