
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
}) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
