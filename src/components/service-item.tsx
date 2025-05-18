import type { Service } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ServiceItemProps {
  service: Service;
}

export function ServiceItem({ service }: ServiceItemProps) {
  const IconComponent = service.icon;
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="items-center text-center">
        <div className="p-3 bg-accent/20 rounded-full mb-3">
          <IconComponent className="h-8 w-8 text-accent" />
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
