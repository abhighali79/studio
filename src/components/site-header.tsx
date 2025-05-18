
'use client';
import React from 'react'; // Ensured React is imported
import Link from 'next/link';
import { Package2, Home, User, ShieldCheck, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// NavLinkItem Props type definition removed

const NavLinkItem = ({
  href,
  icon: Icon,
  label,
  onClick,
  isMobile,
  asChild = true, 
  disabled = false,
  className: itemClassName = ""
}) => {
  const baseButtonClasses = isMobile ? "w-full justify-start text-base py-3" : "text-sm sm:text-base";
  
  let buttonElement;

  if (href) {
    buttonElement = (
      <Button
        variant="ghost"
        asChild={asChild} 
        className={`${baseButtonClasses} ${itemClassName}`}
        disabled={disabled}
      >
        <Link href={href} className="flex items-center space-x-2" onClick={onClick}>
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      </Button>
    );
  } else {
    buttonElement = (
      <Button
        variant="ghost"
        asChild={false} 
        className={`${baseButtonClasses} flex items-center space-x-2 ${itemClassName}`}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    );
  }

  if (isMobile) {
    return <SheetClose asChild>{buttonElement}</SheetClose>;
  }
  return buttonElement;
};


export function SiteHeader() {
  const { isAdminAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const handleAdminClick = () => {
    if (!isAdminAuthenticated) {
      router.push('/login');
    } else {
      router.push('/dashboard/admin');
    }
  };

  const adminNavPropsBase = {
    icon: ShieldCheck,
    label: "Admin",
    onClick: handleAdminClick,
    asChild: false, // Important: asChild is false because Button directly contains icon/label
  };

  const logoutNavPropsBase = {
    icon: LogOut,
    label: "Logout",
    onClick: handleLogout,
    asChild: false, // Important: asChild is false
  };
  
  const loadingNavPropsBase = {
    icon: ShieldCheck,
    label: "Admin",
    disabled: true,
    className: "animate-pulse",
    asChild: false, // Important: asChild is false
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Sai Infotech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <NavLinkItem href="/" icon={Home} label="Home" isMobile={false} />
          <NavLinkItem href="/dashboard/user" icon={User} label="Dashboard" isMobile={false} />
          {loading ? (
            <NavLinkItem {...loadingNavPropsBase} isMobile={false} />
          ) : isAdminAuthenticated ? (
            <NavLinkItem {...logoutNavPropsBase} isMobile={false} />
          ) : (
            <NavLinkItem {...adminNavPropsBase} isMobile={false} />
          )}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <div className="p-4">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center space-x-2 mb-6">
                    <Package2 className="h-7 w-7 text-primary" />
                    <span className="font-bold text-2xl">Sai Infotech</span>
                  </Link>
                </SheetClose>
                <nav className="flex flex-col space-y-3">
                  <NavLinkItem href="/" icon={Home} label="Home" isMobile={true} />
                  <NavLinkItem href="/dashboard/user" icon={User} label="Dashboard" isMobile={true} />
                  {loading ? (
                    <NavLinkItem {...loadingNavPropsBase} isMobile={true} />
                  ) : isAdminAuthenticated ? (
                    <NavLinkItem {...logoutNavPropsBase} isMobile={true} />
                  ) : (
                     // For mobile when not authenticated, NavLinkItem handles the onClick directly
                    <NavLinkItem {...adminNavPropsBase} isMobile={true} onClick={() => router.push('/login')} />
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
