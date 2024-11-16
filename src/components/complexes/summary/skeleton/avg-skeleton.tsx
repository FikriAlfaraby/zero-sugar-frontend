import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AvgSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Skeleton loading states */}
      {["AVG Sugar", "AVG Drink", "AVG Activities", "AVG Sleep Hours"].map(
        (title, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
