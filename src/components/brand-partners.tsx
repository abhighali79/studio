
import React from 'react';

const HPLogo = () => (
  <svg viewBox="0 0 70 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="HP Logo">
    <text x="35" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#007DBA" textAnchor="middle">HP</text>
  </svg>
);

const DellLogo = () => (
  <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="Dell Logo">
    <text x="50" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#007DB8" textAnchor="middle">DELL</text>
  </svg>
);

const LenovoLogo = () => (
  <svg viewBox="0 0 130 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="Lenovo Logo">
    <text x="65" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#E2231A" textAnchor="middle">Lenovo</text>
  </svg>
);

const AcerLogo = () => (
  <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="Acer Logo">
    <text x="50" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#87C442" textAnchor="middle">acer</text>
  </svg>
);

const EpsonLogo = () => (
  <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="Epson Logo">
    <text x="60" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#003399" textAnchor="middle">EPSON</text>
  </svg>
);

const AsusLogo = () => (
  <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="ASUS Logo">
    <text x="50" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#0052A0" textAnchor="middle">ASUS</text>
  </svg>
);

const CanonLogo = () => (
  <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="Canon Logo">
    <text x="60" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#DA291C" textAnchor="middle">Canon</text>
  </svg>
);

const SamsungLogo = () => (
  <svg viewBox="0 0 160 30" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="Samsung Logo">
    <text x="80" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="bold" fill="#1428A0" textAnchor="middle">SAMSUNG</text>
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" preserveAspectRatio="xMidYMid meet" aria-label="Microsoft Logo">
    <rect x="1" y="1" width="22" height="22" fill="#F25022" /> {/* Red */}
    <rect x="27" y="1" width="22" height="22" fill="#7FBA00" /> {/* Green */}
    <rect x="1" y="27" width="22" height="22" fill="#00A4EF" /> {/* Blue */}
    <rect x="27" y="27" width="22" height="22" fill="#FFB900" /> {/* Yellow */}
  </svg>
);


const brands = [
  { name: 'HP', id: 'hp', LogoComponent: HPLogo },
  { name: 'Dell', id: 'dell', LogoComponent: DellLogo },
  { name: 'Lenovo', id: 'lenovo', LogoComponent: LenovoLogo },
  { name: 'Acer', id: 'acer', LogoComponent: AcerLogo },
  { name: 'Epson', id: 'epson', LogoComponent: EpsonLogo },
  { name: 'ASUS', id: 'asus', LogoComponent: AsusLogo },
  { name: 'Canon', id: 'canon', LogoComponent: CanonLogo },
  { name: 'Samsung', id: 'samsung', LogoComponent: SamsungLogo },
  { name: 'Microsoft', id: 'microsoft', LogoComponent: MicrosoftLogo },
];

export function BrandPartners() {
  return (
    <section className="py-12 md:py-16 bg-muted/20 border-t border-border/40">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10 md:mb-12">
          Our Valued Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group flex justify-center items-center p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-24" // Increased height
              title={brand.name}
            >
              <brand.LogoComponent />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
