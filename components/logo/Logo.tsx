import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-3 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className="text-lg font-medium text-neutral-700">TaskBoard</p>
      </div>
    </Link>
  );
};
