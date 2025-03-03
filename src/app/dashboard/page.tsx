// src/app/dashboard/page.tsx
'use client';

import ProtectedRoute from '@/app/components/ProtectedRoute'
import AIContentGenerator from '@/app/components/AIContentGenerator'
import { useAuth } from '@/app/context/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.email}</h1>
        <AIContentGenerator />
      </div>
    </ProtectedRoute>
  )
}