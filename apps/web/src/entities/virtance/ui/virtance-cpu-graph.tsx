import * as d3 from 'd3';
import useMeasure from 'react-use-measure';
import type { VirtanceCPUMetrics } from '../types';
import { format } from 'date-fns';

export function VirtanceCPUGraph({ metrics }: { metrics: VirtanceCPUMetrics }) {
  const [ref, bounds] = useMeasure();

  const sys: [Date, number][] = metrics.data.sys.map((d) => [
    new Date(d[0] * 1000),
    parseFloat(d[1]),
  ]);

  const user: [Date, number][] = metrics.data.user.map((d) => [
    new Date(d[0] * 1000),
    parseFloat(d[1]),
  ]);

  const margins = {
    top: 40,
    right: 64,
    bottom: 40,
    left: 48,
  };

  function getMaxY(arr: number[]) {
    const max = d3.max(arr);

    if (max && max <= 2) {
      return 5;
    }
    if (max && max <= 25) {
      return 50;
    }
    if (max && max > 50) {
      return 100;
    }
    return 100;
  }

  const xScale = d3
    .scaleTime()
    .domain(d3.extent([...sys], (d) => d[0]))
    .range([margins.left, bounds.width - 24]);

  const yScale = d3
    .scaleLinear()
    .domain([0, getMaxY([...sys.map((d) => d[1]), ...user.map((d) => d[1])])])
    .range([bounds.height - margins.bottom, margins.top]);

  const sysLine = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
  const s = sysLine(sys);

  const userLine = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
  const u = userLine(user);

  return (
    <div className="h-[300px] w-full" ref={ref}>
      <svg
        className="rounded-md border dark:border-neutral-800"
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
      >
        {/* sys line */}
        <path
          d={s}
          fill="none"
          className="text-sky-500"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* sys line */}
        <path
          d={u}
          fill="none"
          className="text-pink-500"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* y axis */}
        {yScale.ticks(5).map((tick) => (
          <g transform={`translate(40,${yScale(tick)})`} key={tick}>
            <line
              x1={margins.left - 40}
              x2={bounds.width - margins.right}
              stroke="currentColor"
              strokeWidth={0.5}
              strokeDasharray={1.8}
              opacity={0.2}
            />
            <text
              style={{ textAnchor: 'end' }}
              dominantBaseline="middle"
              fill="currentColor"
              className="text-xs opacity-50"
            >
              {tick}
              {metrics.unit}
            </text>
          </g>
        ))}

        {/* x axis */}
        {xScale.ticks(5).map((date, i) => (
          <g key={i} transform={`translate(${xScale(date)},${bounds.height - 16})`}>
            <text
              style={{ textAnchor: 'middle' }}
              className="text-xs opacity-50"
              fill="currentColor"
            >
              {format(date, 'hh:mm a')}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
