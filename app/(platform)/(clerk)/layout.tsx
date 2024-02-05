type Props = {
  children: React.ReactNode;
};

const ClerkLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center bg-indigo-800">
      {children}
    </div>
  );
};

export default ClerkLayout;
