import { AnnounceWithNav } from "../components/AnounceWithNav";
import Footer from "../components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnounceWithNav />
      {children}
      <Footer />
    </>
  );
}
