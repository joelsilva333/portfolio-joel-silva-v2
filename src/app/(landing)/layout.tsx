import Header from "../ui/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen overflow-hiddens relative">
      <Header />
      {children}
    </div>
  );
}
