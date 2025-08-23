// app/(admin)/layout.tsx
import { AuthProvider } from "../auth-context";
import { createClient } from "@/utlis/supabase/server";
import DisableScrollRestoration from "../components/DisableScroll";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <AuthProvider initialUser={user ?? null}>
      <DisableScrollRestoration />
      {children}
    </AuthProvider>
  );
}
