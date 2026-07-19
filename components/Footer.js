import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
        <p className="text-[13px] text-[#5c5e66]">
          tutoriais.dev — programação, informática, Windows e celulares.
        </p>
        <Link href="/admin/login" className="text-[13px] text-[#3f4048] hover:text-[#8d8f97]">
          Administrador
        </Link>
      </div>
    </footer>
  );
}
