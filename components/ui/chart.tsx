"use client"

import * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border bg-background px-3 py-2 text-sm shadow-sm", className)} {...props} />
  ),
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipLabel = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("font-medium", className)} {...props} />,
)
ChartTooltipLabel.displayName = "ChartTooltipLabel"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...props} />,
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartTooltipItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    color?: string
  }
>(({ className, children, color, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-1 text-xs", className)} {...props}>
    {color && <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />}
    {children}
  </div>
))
ChartTooltipItem.displayName = "ChartTooltipItem"

interface LineChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  yAxisWidth?: number
}

function LineChart({
  data,
  index,
  categories,
  colors = ["#0ea5e9"],
  valueFormatter = (value: number) => value.toString(),
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  yAxisWidth = 40,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 16,
        }}
      >
        {showGridLines && <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />}
        {showXAxis && <XAxis dataKey={index} tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => valueFormatter(value)}
            className="text-xs"
          />
        )}
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) {
              return null
            }

            return (
              <ChartTooltip>
                <ChartTooltipLabel>{label}</ChartTooltipLabel>
                <ChartTooltipContent>
                  {payload.map((item, index) => (
                    <ChartTooltipItem key={item.name} color={item.color}>
                      {item.name}: {valueFormatter(item.value as number)}
                    </ChartTooltipItem>
                  ))}
                </ChartTooltipContent>
              </ChartTooltip>
            )
          }}
        />
        {showLegend && (
          <Legend
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                {payload?.map((item, index) => (
                  <div key={item.value} className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        )}
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  yAxisWidth?: number
  layout?: "horizontal" | "vertical"
}

function BarChart({
  data,
  index,
  categories,
  colors = ["#0ea5e9"],
  valueFormatter = (value: number) => value.toString(),
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  yAxisWidth = 40,
  layout = "horizontal",
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 16,
        }}
      >
        {showGridLines && <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />}
        {showXAxis && (
          <XAxis
            dataKey={layout === "horizontal" ? index : undefined}
            type={layout === "horizontal" ? "category" : "number"}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={layout === "horizontal" ? undefined : (value) => valueFormatter(value)}
            className="text-xs"
          />
        )}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            dataKey={layout === "vertical" ? index : undefined}
            type={layout === "vertical" ? "category" : "number"}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={layout === "vertical" ? undefined : (value) => valueFormatter(value)}
            className="text-xs"
          />
        )}
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) {
              return null
            }

            return (
              <ChartTooltip>
                <ChartTooltipLabel>{label}</ChartTooltipLabel>
                <ChartTooltipContent>
                  {payload.map((item, index) => (
                    <ChartTooltipItem key={item.name} color={item.color}>
                      {item.name}: {valueFormatter(item.value as number)}
                    </ChartTooltipItem>
                  ))}
                </ChartTooltipContent>
              </ChartTooltip>
            )
          }}
        />
        {showLegend && (
          <Legend
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                {payload?.map((item, index) => (
                  <div key={item.value} className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        )}
        {categories.map((category, index) => (
          <Bar key={category} dataKey={category} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

interface AreaChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  yAxisWidth?: number
}

function AreaChart({
  data,
  index,
  categories,
  colors = ["#0ea5e9"],
  valueFormatter = (value: number) => value.toString(),
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  yAxisWidth = 40,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 16,
        }}
      >
        {showGridLines && <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />}
        {showXAxis && <XAxis dataKey={index} tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => valueFormatter(value)}
            className="text-xs"
          />
        )}
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) {
              return null
            }

            return (
              <ChartTooltip>
                <ChartTooltipLabel>{label}</ChartTooltipLabel>
                <ChartTooltipContent>
                  {payload.map((item, index) => (
                    <ChartTooltipItem key={item.name} color={item.color}>
                      {item.name}: {valueFormatter(item.value as number)}
                    </ChartTooltipItem>
                  ))}
                </ChartTooltipContent>
              </ChartTooltip>
            )
          }}
        />
        {showLegend && (
          <Legend
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                {payload?.map((item, index) => (
                  <div key={item.value} className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        )}
        {categories.map((category, index) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={colors[index % colors.length]}
            stroke={colors[index % colors.length]}
            fillOpacity={0.3}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

interface PieChartProps {
  data: any[]
  index: string
  category: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLabel?: boolean
  showLegend?: boolean
  startAngle?: number
  endAngle?: number
  innerRadius?: number
  outerRadius?: number
  paddingAngle?: number
}

function PieChart({
  data,
  index,
  category,
  colors = ["#0ea5e9", "#14b8a6", "#6366f1", "#8b5cf6", "#ec4899"],
  valueFormatter = (value: number) => value.toString(),
  showLabel = false,
  showLegend = true,
  startAngle = 0,
  endAngle = 360,
  innerRadius = 0,
  // @ts-ignore
  outerRadius = "80%",
  paddingAngle = 0,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 16,
        }}
      >
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          label={showLabel ? ({ name, value }) => `${name}: ${valueFormatter(value)}` : undefined}
          labelLine={showLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) {
              return null
            }

            const [item] = payload

            return (
              <ChartTooltip>
                <ChartTooltipLabel>{item.name}</ChartTooltipLabel>
                <ChartTooltipContent>
                  <ChartTooltipItem color={item.color}>{valueFormatter(item.value as number)}</ChartTooltipItem>
                </ChartTooltipContent>
              </ChartTooltip>
            )
          }}
        />
        {showLegend && (
          <Legend
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                {payload?.map((item, index) => (
                  <div key={item.value} className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

interface RadialBarChartProps {
  data: any[]
  index: string
  category: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLabel?: boolean
  showLegend?: boolean
  startAngle?: number
  endAngle?: number
  innerRadius?: number
  outerRadius?: number
}

function RadialBarChart({
  data,
  index,
  category,
  colors = ["#0ea5e9", "#14b8a6", "#6366f1", "#8b5cf6", "#ec4899"],
  valueFormatter = (value: number) => value.toString(),
  showLabel = false,
  showLegend = true,
  startAngle = 0,
  endAngle = 360,
  innerRadius = 0,
  // @ts-ignore
  outerRadius = "80%",
}: RadialBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadialBarChart
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        data={data}
        startAngle={startAngle}
        endAngle={endAngle}
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 16,
        }}
      >
        <RadialBar
          dataKey={category}
          nameKey={index}
          // @ts-ignore
          label={showLabel ? ({ name, value }) => `${name}: ${valueFormatter(value)}` : undefined}
          labelLine={showLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </RadialBar>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) {
              return null
            }

            const [item] = payload

            return (
              <ChartTooltip>
                <ChartTooltipLabel>{item.name}</ChartTooltipLabel>
                <ChartTooltipContent>
                  <ChartTooltipItem color={item.color}>{valueFormatter(item.value as number)}</ChartTooltipItem>
                </ChartTooltipContent>
              </ChartTooltip>
            )
          }}
        />
        {showLegend && (
          <Legend
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                {payload?.map((item, index) => (
                  <div key={item.value} className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        )}
      </RechartsRadialBarChart>
    </ResponsiveContainer>
  )
}

export const Chart = {
  Line: LineChart,
  Bar: BarChart,
  Area: AreaChart,
  Pie: PieChart,
  RadialBar: RadialBarChart,
  Tooltip: ChartTooltip,
  TooltipLabel: ChartTooltipLabel,
  TooltipContent: ChartTooltipContent,
  TooltipItem: ChartTooltipItem,
}

export const ChartContainer = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{children}</div>
}

export { ChartTooltip, ChartTooltipContent }

export const ChartLegend = Legend
export const ChartLegendContent = () => null
export const ChartStyle = () => null

