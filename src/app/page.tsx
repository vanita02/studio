
'use client';

import { CareerCompassWizard } from "@/components/career-compass/wizard";
import { Logo } from "@/components/icons";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 pb-8 md:pb-12 pt-8 md:pt-12">
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
