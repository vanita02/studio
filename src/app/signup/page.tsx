'use client';

import { AuthForm } from '@/components/auth-form';
import { auth, createUserWithEmailAndPassword } from '@/firebase/firebase-auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (values: { email:string; password: string }) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
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
        mode="signup"
        onSubmit={handleSignup}
        title="Create an account"
        description="Enter your email and password to create an account"
        buttonText="Sign Up"
      />
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}
