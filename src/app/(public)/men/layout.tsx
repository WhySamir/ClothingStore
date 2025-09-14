import ClientProvider from "@/app/components/ReactQueryClientProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientProvider>{children}</ClientProvider>
    </>
  );
}
