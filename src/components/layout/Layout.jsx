import { BottomNavigation, SideNavigation } from "./Navigation";

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <SideNavigation />
      <BottomNavigation />

      <main className="md:ml-64 pb-20 md:pb-8">
        <div className="max-w-2xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
