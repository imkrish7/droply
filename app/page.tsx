import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="grid grid-rows-[50px_1fr] items-center justify-items-center h-screen">
      <header className="flex px-2 w-full justify-between items-center">
        <span className="text-4xl font-bold text-gray-800">droply</span>
        <div className="flex gap-2">
          <Button variant={"outline"}>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
          <Button variant={"ghost"}>
            <Link href={"/sign-up"}>Sign up</Link>
          </Button>
        </div>
      </header>
      <main className="grid grid-cols-[1fr_1fr] h-full">
        
        <section className="h-full">
          <Hero />
        </section>
        <section className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4">
            <span className="text-3xl text-gray-700 font-semibold">
              Droply your personal storage
            </span>
            <span className="text-lg text-gray-300">
              Upload your files and live your life worry free
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
