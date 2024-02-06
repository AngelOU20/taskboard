import { Sidebar } from '../_components/Sidebar';

type Props = {
  children: React.ReactNode;
};

const OrganizationLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
