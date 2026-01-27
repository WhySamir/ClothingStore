import { AnnounceWithNav } from "../components/AnounceWithNav";
import Footer from "../components/Footer";
import ToastProvider from "../components/ToastProvider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnounceWithNav />
      {children}
      <ToastProvider />
      <Footer />
    </>
  );
}
