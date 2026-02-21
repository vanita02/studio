'use client';

import { AuthForm } from '@/components/auth-form';
import { auth, signInWithEmailAndPassword } from '@/firebase/firebase-auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="mb-8 flex flex-col items-center text-center">
            <Logo className="h-10 w-10 text-primary" />
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-primary">
              Career Compass
            </h1>
      </div>
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        title="Login"
        description="Enter your email below to login to your account"
        buttonText="Login"
      />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
