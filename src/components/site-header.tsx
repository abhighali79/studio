import Link from 'next/link';
import { Package2, Home, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SaiQuickOrder</span>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/user" className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/admin" className="flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
