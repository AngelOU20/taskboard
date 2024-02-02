import { Button } from '@/components/ui/button';
import { Medal } from 'lucide-react';
import Link from 'next/link';
import localFont from 'next/font/local';

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={`flex items-center justify-center flex-col ${headingFont.className} tracking-widest`}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskboard helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-4 py-2 rounded-lg w-fit">
          work forward.
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Taskboard
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Taskboard for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
