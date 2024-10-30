import { useQuery } from '@tanstack/react-query';
import { format, fromUnixTime } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Spin } from 'ui/components/spin';

import {
  getVirtanceNetMetrics,
  VirtanceNetMetrics,
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
  inbound: number;
  outbound: number;
};

function transformData(data: VirtanceNetMetrics['data']): TransformedData[] {
  return data.inbound.map(([timestamp, inboundValue], index) => ({
    date: timestamp,
    inbound: parseFloat(inboundValue),
    outbound: parseFloat(data.outbound[index][1]),
  }));
}

const chartConfig = {
  sys: {
    label: 'sys',
    color: 'hsl(var(--chart-1))',
  },
  inbound: {
    label: 'inbound',
    color: 'hsl(var(--chart-2))',
  },
  outbound: {
    label: 'outbound',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function VirtanceNetGraphs({ virtanceId }: { virtanceId: number }) {
  const { data } = useQuery({
    queryKey: virtanceQueries.metrics.net(virtanceId),
    queryFn: () =>
      getVirtanceNetMetrics(virtanceId).then((response) => ({
        public: transformData(response.metrics[0].data),
        private: transformData(response.metrics[1].data),
      })),
    refetchInterval: 5000,
  });

  return (
    <>
      <div className="bg-card space-y-1 rounded-lg border shadow-sm">
        <div className="border-b p-4">
          <h2 className="text-base font-semibold">Public Network</h2>
        </div>
        <div className="p-4 pl-2">
          {data ? (
            <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
              <AreaChart accessibilityLayer data={data.public}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  tickMargin={8}
                  axisLine={true}
                  style={{ fontSize: '10px' }}
                  minTickGap={32}
                  tickFormatter={(value: number) =>
                    format(fromUnixTime(value), 'HH:mm a')
                  }
                />
                <YAxis style={{ fontSize: '10px' }} />
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
                  dataKey="inbound"
                  fill="var(--color-inbound)"
                  fillOpacity={0.4}
                  stroke="var(--color-inbound)"
                />
                <Area
                  type="step"
                  dataKey="outbound"
                  fill="var(--color-outbound)"
                  fillOpacity={0.4}
                  stroke="var(--color-outbound)"
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
      <div className="bg-card space-y-1 rounded-lg border shadow-sm">
        <div className="border-b p-4">
          <h2 className="text-base font-semibold">Private Network</h2>
        </div>
        <div className="p-4 pl-2">
          {data ? (
            <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
              <AreaChart accessibilityLayer data={data.private}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  tickMargin={8}
                  axisLine={true}
                  style={{ fontSize: '10px' }}
                  minTickGap={32}
                  tickFormatter={(value: number) =>
                    format(fromUnixTime(value), 'HH:mm a')
                  }
                />
                <YAxis style={{ fontSize: '10px' }} />
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
                  dataKey="inbound"
                  fill="var(--color-inbound)"
                  fillOpacity={0.4}
                  stroke="var(--color-inbound)"
                />
                <Area
                  type="step"
                  dataKey="outbound"
                  fill="var(--color-outbound)"
                  fillOpacity={0.4}
                  stroke="var(--color-outbound)"
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
    </>
  );
}
