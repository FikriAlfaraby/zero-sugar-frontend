'use client';

import { Spinner } from '@/components/ui/spinner';
import SummaryNotFinished from './SummaryNotFinished';
import AverageCards from './avg-card';
import MostCards from './most-card';
import LineChart from './line-chart';
import PieChartsGrid from './pie-chart-grid';

import { useUserJourney } from '../user-journey/service/fetchUserJourney.service';
import { useAvgSummary } from './hooks/fetchAvgService.service';
import { useLineChartSummary } from './hooks/fetchLineChart.service';
import { usePieChartSummary } from './hooks/fetchPieChart.service';
import { useModusSummary } from './hooks/fetchModus.service';
import AvgSkeleton from './skeleton/avg-skeleton';
import LineChartSkeleton from './skeleton/line-skeleton';
import PieChartsGridSkeleton from './skeleton/pie-skeleton';

// Komponen Empty untuk menampilkan ketika data tidak ada
const EmptyComponent = () => (
  <div className="flex justify-center items-center text-gray-500">No data available</div>
);

export default function DashboardContainer({ userId }: { userId: number }) {
  // Fetch hooks
  const { data: journeyData, isLoading: isJourneyLoading } = useUserJourney(userId);
  const { data: avgData, isLoading: isAvgLoading } = useAvgSummary(userId);
  const { data: lineData, isLoading: isLineLoading } = useLineChartSummary(userId);
  const { data: pieData, isLoading: isPieLoading } = usePieChartSummary(userId);
  const { data: mostData, isLoading: isMostLoading } = useModusSummary(userId);


  // Global loading state for user journey
  if (isJourneyLoading) {
    return (
      <div className="flex h-[calc(100vh-60px)] items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  // Display incomplete summary if necessary
  if (!journeyData?.isEnd) {
    return <SummaryNotFinished firstDate={journeyData?.data[0]?.CREATED_AT ?? ''} />;
  }

  // Render main dashboard
  return (
    <div className="space-y-6 p-4">
      {/* Average Cards */}
      {isAvgLoading && !isJourneyLoading ? (
          <AvgSkeleton/>
      ) : avgData ? (
        <AverageCards avgData={avgData} />
      ) : (
        <EmptyComponent />
      )}

      {/* Most Records Cards */}
      {isMostLoading && !isJourneyLoading ? (
        <AvgSkeleton/>
      ) : mostData ? (
        <MostCards mostData={mostData} />
      ) : (
        <EmptyComponent />
      )}

      {/* Line Chart */}
      {isLineLoading && !isJourneyLoading ? (
        <LineChartSkeleton />
      ) : lineData?.data ? (
        <LineChart data={lineData?.data} />
      ) : (
        <EmptyComponent />
      )}

      {/* Pie Charts Grid */}
      {isPieLoading && !isJourneyLoading ? (
        <PieChartsGridSkeleton />
      ) : pieData?.data ? (
        <PieChartsGrid data={pieData?.data} />
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
}
