import { Card } from 'primereact/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as ChartTooltip } from 'recharts';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PieChartWithLegendProps = {
  title: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  nameKey: string;
  labelFormatter?: (value: any) => string; // Fungsi opsional untuk memformat label
  colors?: string[]; // Array warna opsional
};

const PieChartWithLegend: React.FC<PieChartWithLegendProps> = ({
  title,
  data,
  dataKey,
  nameKey,
  labelFormatter,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], // Default warna
}) => {
  const getColor = (index: number) => colors[index % colors.length];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex h-[250px] items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Tooltip untuk menampilkan detail */}
              <ChartTooltip
                content={({ payload }: any) => {
                  if (payload && payload.length) {
                    const item = payload[0].payload;
                    const formattedName = labelFormatter
                      ? labelFormatter(item[nameKey])
                      : item[nameKey];
                    return (
                      <div className="rounded bg-white p-2 text-sm shadow-md">
                        <p>
                          <strong>
                            {formattedName}
                            :
                          </strong>
                          {' '}
                          {item[dataKey]}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                fill="#8884d8"
                paddingAngle={5}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(index)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend di bawah chart */}
        <div className="mt-4 flex flex-col space-y-2">
          {data.map((entry, index) => {
            const formattedName = labelFormatter
              ? labelFormatter(entry[nameKey])
              : entry[nameKey];
            return (
              <div key={index} className="flex items-center space-x-2">
                {/* Kotak warna sesuai dengan potongan chart */}
                <div
                  className="size-4 rounded-sm"
                  style={{ backgroundColor: getColor(index) }}
                >
                </div>
                {/* Nama kategori dan jumlah */}
                <span className="text-sm font-medium">{formattedName}</span>
                <span className="text-sm text-gray-500">
                  (
                  {entry[dataKey]}
                  )
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartWithLegend;
