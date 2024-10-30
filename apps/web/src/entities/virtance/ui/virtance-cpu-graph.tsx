import { useQuery } from '@tanstack/react-query';
import { format, fromUnixTime } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Spin } from 'ui/components/spin';

import {
  getVirtanceCPUMetrics,
  VirtanceCPUMetrics,
  virtanceQueries,
} from '@/entities/virtance';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/chart';

type TransformedData = {
  date: number;
  sys: number;
  user: number;
  total: number;
};

function transformData(data: VirtanceCPUMetrics['data']): TransformedData[] {
  return data.sys.map(([timestamp, sysValue], index) => ({
    date: timestamp,
    sys: parseFloat(sysValue),
    user: parseFloat(data.user[index][1]),
    total: parseFloat(data.total[index][1]),
  }));
}

const chartConfig = {
  sys: {
    label: 'sys',
    color: 'hsl(var(--chart-1))',
  },
  user: {
    label: 'user',
    color: 'hsl(var(--chart-2))',
  },
  total: {
    label: 'total',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function VirtanceCPUGraph({ virtanceId }: { virtanceId: number }) {
  const { data } = useQuery({
    queryKey: virtanceQueries.metrics.cpu(virtanceId),
    queryFn: () =>
      getVirtanceCPUMetrics(virtanceId).then((response) =>
        transformData(response.metrics.data),
      ),
    refetchInterval: 5000,
  });

  return (
    <div className="bg-card space-y-1 rounded-lg border shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-base font-semibold">CPU %</h2>
      </div>
      <div className="p-4 pl-0">
        {data ? (
          <ChartContainer
            config={chartConfig}
            className="-ml-2 aspect-auto h-[320px] w-full"
          >
            <AreaChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={true}
                tickMargin={8}
                axisLine={true}
                style={{ fontSize: '10px' }}
                minTickGap={32}
                tickFormatter={(value: number) => format(fromUnixTime(value), 'HH:mm a')}
              />
              <YAxis
                style={{ fontSize: '10px' }}
                tickFormatter={(value: number) => `${value}%`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(_, [payload]) =>
                      format(fromUnixTime(payload.payload.date), 'MMM d, y h:mm:ss a')
                    }
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="step"
                dataKey="sys"
                fill="var(--color-sys)"
                fillOpacity={0.4}
                stroke="var(--color-sys)"
              />
              <Area
                type="step"
                dataKey="user"
                fill="var(--color-user)"
                fillOpacity={0.4}
                stroke="var(--color-user)"
              />
              <Area
                type="step"
                dataKey="total"
                fill="var(--color-total)"
                fillOpacity={0.4}
                stroke="var(--color-total)"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[320px] w-full items-center justify-center">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
}
