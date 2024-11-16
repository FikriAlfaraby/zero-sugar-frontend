'use client';

export default function PieChartsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((key) => (
        <div key={key} className="animate-pulse">
          <div className="rounded-lg border border-muted p-4 shadow-sm">
            {/* Header Skeleton */}
            <div className="h-5 w-2/3 bg-muted rounded mb-4"></div>
            {/* Chart Skeleton */}
            <div className="h-[250px] w-full bg-muted rounded"></div>
            {/* Legend Skeleton */}
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((legendKey) => (
                <div key={legendKey} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-muted rounded-sm"></div>
                  <div className="h-4 w-1/3 bg-muted rounded"></div>
                  <div className="h-4 w-10 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
