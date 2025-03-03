'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

interface AuthFormProps {
  isRegister?: boolean;
}

export function AuthForm({ isRegister = false }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      if (isRegister) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(isRegister ? 'Failed to create account' : 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{isRegister ? 'Create Account' : 'Sign In'}</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {isRegister && (
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? (isRegister ? 'Creating account...' : 'Signing in...') : isRegister ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-4">
        <button
          onClick={() => signInWithGoogle()}
          className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 flex items-center justify-center"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link href={isRegister ? '/login' : '/register'} className="text-blue-500 hover:text-blue-600">
          {isRegister ? 'Sign In' : 'Create one'}
        </Link>
      </p>
    </div>
  );
}

export function SignInForm() {
  return <AuthForm isRegister={false} />;
}

export function SignUpForm() {
  return <AuthForm isRegister={true} />;
}
