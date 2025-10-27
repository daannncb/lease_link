import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
    <header className="bg-slate-700 shadow-lg">
     <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-3xl">Lease
        <Image
                src="/logo.png" 
                alt="Lease Link Logo" 
                width={50} 
                height={50}
        />Link
                </Link>
            </div>
        </header>
    );
}