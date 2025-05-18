
import React from 'react';

const brands = [
  { name: 'HP', id: 'hp' },
  { name: 'Dell', id: 'dell' },
  { name: 'Lenovo', id: 'lenovo' },
  { name: 'Acer', id: 'acer' },
  { name: 'Epson', id: 'epson' },
  { name: 'ASUS', id: 'asus' },
  { name: 'Canon', id: 'canon' },
  { name: 'Apple', id: 'apple' },
  { name: 'Samsung', id: 'samsung' },
  { name: 'Microsoft', id: 'microsoft' },
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
              className="group flex justify-center items-center p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-20"
              title={brand.name}
            >
              <span className="text-lg sm:text-xl font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
