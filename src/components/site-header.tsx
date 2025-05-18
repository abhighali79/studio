
'use client';
import Link from 'next/link';
import { Package2, Home, User, ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function SiteHeader() {
  const { isAdminAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    // The logout function in AuthContext already handles routing to /login
  };

  const handleAdminClick = () => {
    if (!isAdminAuthenticated) {
      router.push('/login');
    } else {
      router.push('/dashboard/admin');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Sai Infotech</span>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center space-x-1 text-sm sm:text-base">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/user" className="flex items-center space-x-1 text-sm sm:text-base">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </Button>
          
          {loading ? (
             <Button variant="ghost" className="flex items-center space-x-1 text-sm sm:text-base" disabled>
                <ShieldCheck className="h-4 w-4 animate-pulse" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
          ) : isAdminAuthenticated ? (
            <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-1 text-sm sm:text-base">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleAdminClick} className="flex items-center space-x-1 text-sm sm:text-base">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
