import { Poppins } from 'next/font/google';
import { Navbar } from './_components/Navbar';
import { Footer } from './_components/Footer';

type Props = {
  children: React.ReactNode;
};

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const MarketingLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={`${poppins.className} h-full bg-slate-100`}>
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
