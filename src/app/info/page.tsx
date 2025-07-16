// app/page.tsx

import { PillMenu } from "@/components/ui/morphDropdown";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <PillMenu />
    </main>
  );
}
