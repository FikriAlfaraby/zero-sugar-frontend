import type { LineChartProps } from "../line-chart";

export const avgDefaut = {
  avg_activities: 0,
  avg_drink_consumption: 0,
  avg_hours_sleep: 0,
  avg_sugar: 0,
  user_id: 0
};

export const mostDefault = {
  mode_is_smoking: false,
  mode_risk_profile: "low",
  mode_sleep_quality: "average",
  mode_stress_level: "low",
  user_id: 228
};

export const lineChartDefault : LineChartProps['data'] = {
  ACTIVITIES: [
    { Date: '2024-11-01', Count: 5 },
    { Date: '2024-11-02', Count: 3 },
    { Date: '2024-11-03', Count: 7 },
    { Date: '2024-11-04', Count: 4 },
    { Date: '2024-11-05', Count: 6 },
  ],
  DRINK_CONSUMPTION: [
    { Date: '2024-11-01', Count: 2 },
    { Date: '2024-11-02', Count: 3 },
    { Date: '2024-11-03', Count: 4 },
    { Date: '2024-11-04', Count: 2 },
    { Date: '2024-11-05', Count: 5 },
  ],
  HOURS_SLEEP: [
    { Date: '2024-11-01', Count: 7 },
    { Date: '2024-11-02', Count: 8 },
    { Date: '2024-11-03', Count: 6 },
    { Date: '2024-11-04', Count: 7 },
    { Date: '2024-11-05', Count: 5 },
  ],
  SUGAR: [
    { Date: '2024-11-01', Count: 15 },
    { Date: '2024-11-02', Count: 10 },
    { Date: '2024-11-03', Count: 20 },
    { Date: '2024-11-04', Count: 18 },
    { Date: '2024-11-05', Count: 25 },
  ],
};
