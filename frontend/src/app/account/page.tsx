'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { User } from '@/types'

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          window.location.href = '/login'
          return
        }
        const response = await api.get('/auth/profile')
        setUser(response.data)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        localStorage.removeItem('token')
        window.location.href = '/login'
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">First Name</label>
            <p className="text-lg">{user.firstName}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name</label>
            <p className="text-lg">{user.lastName}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Role</label>
            <p className="text-lg capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
