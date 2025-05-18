
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// GeistMono is not found, remove if not explicitly needed or fix import if package is available
// import { GeistMono } from 'geist/font/mono'; 
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = GeistSans;
// const geistMono = GeistMono; // Comment out if geist/font/mono is not resolved

export const metadata: Metadata = {
  title: 'Sai Infotech - Your Tech Solutions Partner',
  description: 'Sai Infotech: Streamlined product viewing and ordering via WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply GeistSans variable, remove GeistMono if not used or fixed */}
      <body className={`${geistSans.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <AuthProvider>
          <SiteHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <SiteFooter />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
