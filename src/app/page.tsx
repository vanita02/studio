'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { CareerCompassWizard } from "@/components/career-compass/wizard";
import { Logo } from "@/components/icons";
import { Button } from '@/components/ui/button';
import { signOut } from '@/firebase/firebase-auth-client';
import { LogOut } from 'lucide-react';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    // You can show a loading spinner here, or null
    return null;
  }
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <>
      <header className="py-4 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </header>
      <main className="container mx-auto px-4 pb-8 md:pb-12 pt-0">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              Career Compass
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80">
            Chart your course to a successful career. Let's map your education and
            skills to projects, opportunities, and a personalized roadmap for success.
          </p>
        </div>

        <div className="mt-10">
          <CareerCompassWizard />
        </div>
      </main>
    </>
  );
}
