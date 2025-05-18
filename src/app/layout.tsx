
import { GeistSans } from 'geist/font/sans';
// GeistMono import removed
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BrandPartners } from '@/components/brand-partners';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = GeistSans;

// Metadata type import removed
// export const metadata: Metadata = {
export const metadata = {
  title: 'Sai Infotech - Your Tech Solutions Partner',
  description: 'Sai Infotech: Streamlined product viewing and ordering via WhatsApp.',
};

export default function RootLayout({
  children,
}) { // Readonly type removed
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <AuthProvider>
          <SiteHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <BrandPartners />
          <SiteFooter />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
