import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      loadUser()
    }
  }, [])

  const loadUser = async () => {
    try {
      const response = await authService.getMe()
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.data,
          token: localStorage.getItem('token')
        }
      })
    } catch (error) {
      localStorage.removeItem('token')
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Failed to load user' })
    }
  }

  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOGIN_START' })
      const response = await authService.login(email, password)
      localStorage.setItem('token', response.data.token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.data,
          token: response.data.token
        }
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'LOGIN_START' })
      const response = await authService.register(name, email, password)
      localStorage.setItem('token', response.data.token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.data,
          token: response.data.token
        }
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// 👇 THIS FIXES THE IMPORT ERROR
export { AuthContext }
