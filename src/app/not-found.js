import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-(--color-sage-green) text-(--color-beige) px-4">
     <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/20 backdrop-blur-md shadow-lg border border-white/30 text-(--color-beige)">
  
      <h2 className="text-xl mb-2 opacity-80 animate-bounce motion-safe:animate-bounce">Fix It First</h2>
      
 
      <h1 className="text-5xl font-bold mb-6 text-center animate-pulse motion-safe:animate-pulse">
        404  Something Needs Fixing!
      </h1>

   
      <p className="mb-8 text-center max-w-lg motion-safe:animate-pulse">
        This page doesn&apos;t exist yet—maybe it&apos;s a new repair waiting to be added.
      </p>

   
      <Link
        href="/repairs/new"
        className="bg-(--color-beige) text-(--color-sage-green) font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-beige/90 transition motion-safe:animate-bounce"
      >
        Report a New Repair
      </Link>
    </div>
    </div> 
  );
}
