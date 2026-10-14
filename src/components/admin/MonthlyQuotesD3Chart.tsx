import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useSiteData } from '../../context/SiteDataContext';
import { MonthlyQuoteStat } from '../../types';
import { computeMonthlyQuoteStats } from '../../data/monthlyQuotesData';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Calendar, 
  Download, 
  Table, 
  Eye, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Percent
} from 'lucide-react';

type MetricMode = 'volume' | 'revenue' | 'conversion';

export const MonthlyQuotesD3Chart: React.FC = () => {
  const { quotes, globalSettings } = useSiteData();

  // Mode state
  const [metricMode, setMetricMode] = useState<MetricMode>('volume');
  const [timeRange, setTimeRange] = useState<'6m' | '12m'>('12m');
  const [showTable, setShowTable] = useState(false);
  const [hoveredData, setHoveredData] = useState<MonthlyQuoteStat | null>(null);

  // SVG & Tooltip refs
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute live monthly data
  const allMonthlyStats = useMemo(() => {
    return computeMonthlyQuoteStats(quotes);
  }, [quotes]);

  const displayedStats = useMemo(() => {
    if (timeRange === '6m') {
      return allMonthlyStats.slice(-6);
    }
    return allMonthlyStats;
  }, [allMonthlyStats, timeRange]);

  // Aggregate stats across displayed period
  const totalPeriodQuotes = displayedStats.reduce((acc, s) => acc + s.totalQuotes, 0);
  const totalPeriodAccepted = displayedStats.reduce((acc, s) => acc + s.acceptedQuotes, 0);
  const totalPeriodValue = displayedStats.reduce((acc, s) => acc + s.totalValue, 0);
  const avgConversionRate = totalPeriodQuotes > 0 ? Math.round((totalPeriodAccepted / totalPeriodQuotes) * 100) : 0;
  const avgTicket = totalPeriodQuotes > 0 ? Math.round(totalPeriodValue / totalPeriodQuotes) : 0;

  // D3 Rendering effect
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawing

    const containerWidth = containerRef.current.clientWidth || 700;
    const height = Math.min(380, Math.max(300, Math.round(containerWidth * 0.42)));
    const margin = { 
      top: 30, 
      right: metricMode === 'volume' ? 50 : 25, 
      bottom: 40, 
      left: metricMode === 'revenue' ? 70 : 45 
    };

    const innerWidth = containerWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg
      .attr('viewBox', `0 0 ${containerWidth} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Defs for gradients & filters
    const defs = svg.append('defs');

    // Orange Gradient for bars & areas
    const orangeGrad = defs
      .append('linearGradient')
      .attr('id', 'd3-wynx-orange')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    orangeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#FF5500').attr('stop-opacity', 0.95);
    orangeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#FF5500').attr('stop-opacity', 0.25);

    // Emerald Gradient for accepted quotes
    const emeraldGrad = defs
      .append('linearGradient')
      .attr('id', 'd3-wynx-emerald')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    emeraldGrad.append('stop').attr('offset', '0%').attr('stop-color', '#10B981').attr('stop-opacity', 0.95);
    emeraldGrad.append('stop').attr('offset', '100%').attr('stop-color', '#059669').attr('stop-opacity', 0.35);

    // Spline Area Gradient (Revenue)
    const areaGrad = defs
      .append('linearGradient')
      .attr('id', 'd3-wynx-area')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    areaGrad.append('stop').attr('offset', '0%').attr('stop-color', '#FF5500').attr('stop-opacity', 0.45);
    areaGrad.append('stop').attr('offset', '60%').attr('stop-color', '#F59E0B').attr('stop-opacity', 0.15);
    areaGrad.append('stop').attr('offset', '100%').attr('stop-color', '#FF5500').attr('stop-opacity', 0.0);

    // Glow filter
    const filter = defs.append('filter').attr('id', 'd3-glow').attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
    filter.append('feMerge').selectAll('feMergeNode')
      .data(['blur', 'SourceGraphic'])
      .enter()
      .append('feMergeNode')
      .attr('in', (d) => d);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale (Months)
    const xScale = d3
      .scaleBand<string>()
      .domain(displayedStats.map((d) => d.monthLabel))
      .range([0, innerWidth])
      .padding(0.35);

    // Horizontal subtle grid lines
    let yMax = 10;
    if (metricMode === 'volume') {
      yMax = Math.max(d3.max(displayedStats, (d) => d.totalQuotes) || 10, 10);
      yMax = Math.ceil(yMax * 1.25);
    } else if (metricMode === 'revenue') {
      yMax = d3.max(displayedStats, (d) => d.totalValue) || 100000;
      yMax = Math.ceil(yMax * 1.2);
    } else {
      yMax = 60; // Conversion %
    }

    const yScale = d3.scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

    // Secondary Y-Scale for conversion line when in volume mode
    const yRateScale = d3.scaleLinear().domain([0, 60]).range([innerHeight, 0]);

    // Draw background grid lines
    const yTicks = metricMode === 'revenue' ? 5 : 5;
    g.append('g')
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(yScale.ticks(yTicks))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'currentColor')
      .attr('stroke-dasharray', '3 3')
      .attr('class', 'text-neutral-300/40 dark:text-white/[0.06]');

    // X Axis
    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(12);
    const gx = g
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    gx.select('.domain').attr('stroke', 'currentColor').attr('class', 'text-neutral-300 dark:text-white/10');
    gx.selectAll('text')
      .attr('class', 'text-[11px] font-mono-data fill-neutral-600 dark:fill-neutral-400 font-medium');

    // Y Axis (Left)
    const yAxis = d3.axisLeft(yScale).ticks(yTicks).tickSize(0).tickPadding(8);
    if (metricMode === 'revenue') {
      yAxis.tickFormat((d) => {
        const n = d as number;
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M €`;
        if (n >= 1000) return `${Math.round(n / 1000)}k €`;
        return `${n} €`;
      });
    } else if (metricMode === 'conversion') {
      yAxis.tickFormat((d) => `${d}%`);
    } else {
      yAxis.tickFormat((d) => `${d}`);
    }

    const gy = g.append('g').call(yAxis);
    gy.select('.domain').remove();
    gy.selectAll('text')
      .attr('class', 'text-[10px] font-mono-data fill-neutral-500 dark:fill-neutral-400');

    // Secondary Y Axis (Right for Conversion Rate in Volume mode)
    if (metricMode === 'volume') {
      const yRateAxis = d3.axisRight(yRateScale).ticks(4).tickSize(0).tickPadding(8).tickFormat((d) => `${d}%`);
      const gyr = g.append('g').attr('transform', `translate(${innerWidth},0)`).call(yRateAxis);
      gyr.select('.domain').remove();
      gyr.selectAll('text').attr('class', 'text-[10px] font-mono-data fill-emerald-600 dark:fill-emerald-400');
    }

    // Active crosshair guideline
    const hoverLine = g
      .append('line')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'currentColor')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 4')
      .attr('class', 'text-[#FF5500]/60 opacity-0 pointer-events-none');

    // Render Data Based on Mode
    if (metricMode === 'volume') {
      // Grouped Bars: Total Quotes (WYNX Orange) + Accepted Quotes (Emerald)
      const bandwidth = xScale.bandwidth();
      const barWidth = Math.max(8, bandwidth * 0.45);

      // Total Quotes Bars
      g.selectAll('.bar-total')
        .data(displayedStats)
        .enter()
        .append('rect')
        .attr('class', 'bar-total transition-all cursor-pointer')
        .attr('x', (d) => (xScale(d.monthLabel) || 0) + (bandwidth - barWidth * 2 - 3) / 2)
        .attr('y', innerHeight)
        .attr('width', barWidth)
        .attr('height', 0)
        .attr('rx', 3)
        .attr('fill', 'url(#d3-wynx-orange)')
        .transition()
        .duration(650)
        .delay((_, i) => i * 35)
        .attr('y', (d) => yScale(d.totalQuotes))
        .attr('height', (d) => innerHeight - yScale(d.totalQuotes));

      // Accepted Quotes Bars
      g.selectAll('.bar-accepted')
        .data(displayedStats)
        .enter()
        .append('rect')
        .attr('class', 'bar-accepted transition-all cursor-pointer')
        .attr('x', (d) => (xScale(d.monthLabel) || 0) + (bandwidth - barWidth * 2 - 3) / 2 + barWidth + 3)
        .attr('y', innerHeight)
        .attr('width', barWidth)
        .attr('height', 0)
        .attr('rx', 3)
        .attr('fill', 'url(#d3-wynx-emerald)')
        .transition()
        .duration(650)
        .delay((_, i) => i * 35 + 20)
        .attr('y', (d) => yScale(d.acceptedQuotes))
        .attr('height', (d) => innerHeight - yScale(d.acceptedQuotes));

      // Conversion Trend Line (Overlaid)
      const lineGen = d3
        .line<MonthlyQuoteStat>()
        .x((d) => (xScale(d.monthLabel) || 0) + bandwidth / 2)
        .y((d) => yRateScale(d.conversionRate))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(displayedStats)
        .attr('fill', 'none')
        .attr('stroke', '#10B981')
        .attr('stroke-width', 2.5)
        .attr('stroke-linecap', 'round')
        .attr('filter', 'url(#d3-glow)')
        .attr('d', lineGen);

      // Conversion points
      g.selectAll('.rate-point')
        .data(displayedStats)
        .enter()
        .append('circle')
        .attr('class', 'rate-point')
        .attr('cx', (d) => (xScale(d.monthLabel) || 0) + bandwidth / 2)
        .attr('cy', (d) => yRateScale(d.conversionRate))
        .attr('r', 3.5)
        .attr('fill', '#07080B')
        .attr('stroke', '#10B981')
        .attr('stroke-width', 2);
    } else if (metricMode === 'revenue') {
      // Area Spline Chart (Financial Volume)
      const areaGen = d3
        .area<MonthlyQuoteStat>()
        .x((d) => (xScale(d.monthLabel) || 0) + xScale.bandwidth() / 2)
        .y0(innerHeight)
        .y1((d) => yScale(d.totalValue))
        .curve(d3.curveMonotoneX);

      const lineGen = d3
        .line<MonthlyQuoteStat>()
        .x((d) => (xScale(d.monthLabel) || 0) + xScale.bandwidth() / 2)
        .y((d) => yScale(d.totalValue))
        .curve(d3.curveMonotoneX);

      // Fill Area
      g.append('path')
        .datum(displayedStats)
        .attr('fill', 'url(#d3-wynx-area)')
        .attr('d', areaGen);

      // Line Stroke
      g.append('path')
        .datum(displayedStats)
        .attr('fill', 'none')
        .attr('stroke', '#FF5500')
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .attr('filter', 'url(#d3-glow)')
        .attr('d', lineGen);

      // Data Points
      g.selectAll('.point-dot')
        .data(displayedStats)
        .enter()
        .append('circle')
        .attr('class', 'point-dot cursor-pointer transition-transform')
        .attr('cx', (d) => (xScale(d.monthLabel) || 0) + xScale.bandwidth() / 2)
        .attr('cy', (d) => yScale(d.totalValue))
        .attr('r', 4.5)
        .attr('fill', '#FF5500')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 2);
    } else {
      // Conversion Rate % Mode (Goal target line + interactive bars)
      const bandwidth = xScale.bandwidth();
      const barWidth = Math.max(12, bandwidth * 0.6);

      // 30% Benchmark line
      const targetY = yScale(30);
      g.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', targetY)
        .attr('y2', targetY)
        .attr('stroke', '#F59E0B')
        .attr('stroke-dasharray', '4 4')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.8);

      g.append('text')
        .attr('x', innerWidth - 5)
        .attr('y', targetY - 6)
        .attr('text-anchor', 'end')
        .attr('class', 'text-[10px] font-mono-data fill-amber-500 font-semibold')
        .text('Objectif agence : 30%');

      // Conversion bars
      g.selectAll('.bar-conversion')
        .data(displayedStats)
        .enter()
        .append('rect')
        .attr('class', 'bar-conversion cursor-pointer transition-all')
        .attr('x', (d) => (xScale(d.monthLabel) || 0) + (bandwidth - barWidth) / 2)
        .attr('y', innerHeight)
        .attr('width', barWidth)
        .attr('height', 0)
        .attr('rx', 4)
        .attr('fill', (d) => d.conversionRate >= 30 ? 'url(#d3-wynx-emerald)' : 'url(#d3-wynx-orange)')
        .transition()
        .duration(650)
        .delay((_, i) => i * 35)
        .attr('y', (d) => yScale(d.conversionRate))
        .attr('height', (d) => innerHeight - yScale(d.conversionRate));

      // Value label on top of bar
      g.selectAll('.bar-label')
        .data(displayedStats)
        .enter()
        .append('text')
        .attr('x', (d) => (xScale(d.monthLabel) || 0) + bandwidth / 2)
        .attr('y', (d) => yScale(d.conversionRate) - 6)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-[10px] font-mono-data font-bold fill-neutral-800 dark:fill-white')
        .text((d) => `${d.conversionRate}%`);
    }

    // Interactive Hover Overlay Columns
    const hoverBand = g
      .selectAll('.hover-band')
      .data(displayedStats)
      .enter()
      .append('rect')
      .attr('class', 'hover-band')
      .attr('x', (d) => xScale(d.monthLabel) || 0)
      .attr('y', 0)
      .attr('width', xScale.bandwidth())
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'pointer');

    hoverBand
      .on('mouseenter', (_, d) => {
        setHoveredData(d);
        const xPos = (xScale(d.monthLabel) || 0) + xScale.bandwidth() / 2;
        hoverLine.attr('x1', xPos).attr('x2', xPos).attr('class', 'text-[#FF5500]/60 opacity-100');
      })
      .on('mouseleave', () => {
        setHoveredData(null);
        hoverLine.attr('class', 'text-[#FF5500]/60 opacity-0');
      });

  }, [displayedStats, metricMode, timeRange]);

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = ['Mois', 'Total Devis', 'Devis Acceptes', 'Devis Refuses', 'En Cours', 'Montant Total (€)', 'Panier Moyen (€)', 'Taux Conversion (%)'];
    const rows = displayedStats.map((d) => [
      d.fullMonthName,
      d.totalQuotes,
      d.acceptedQuotes,
      d.declinedQuotes,
      d.pendingQuotes,
      d.totalValue,
      d.avgTicketValue,
      `${d.conversionRate}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wynx_devis_mensuels_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-data uppercase font-bold tracking-wider bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20">
              D3.js Visualization
            </span>
            <h2 className="font-display text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
              Statistiques Mensuelles des Demandes de Devis
            </h2>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Analyse dynamique des flux entrants, du volume d'affaires prévisionnel et des signatures de contrats.
          </p>
        </div>

        {/* View & Metric Switchers */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode switch */}
          <div className="inline-flex p-1 bg-neutral-100 dark:bg-[#151923] rounded-lg border border-black/[0.06] dark:border-white/[0.06]">
            <button
              onClick={() => setMetricMode('volume')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                metricMode === 'volume'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Volume & Taux</span>
            </button>
            <button
              onClick={() => setMetricMode('revenue')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                metricMode === 'revenue'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-500" />
              <span>Valeur Estimée (€)</span>
            </button>
            <button
              onClick={() => setMetricMode('conversion')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                metricMode === 'conversion'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-emerald-500" />
              <span>Conversions</span>
            </button>
          </div>

          {/* Time range */}
          <div className="inline-flex p-1 bg-neutral-100 dark:bg-[#151923] rounded-lg border border-black/[0.06] dark:border-white/[0.06]">
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                timeRange === '6m'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              6 Mois
            </button>
            <button
              onClick={() => setTimeRange('12m')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                timeRange === '12m'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              12 Mois
            </button>
          </div>

          {/* Toggle Table & Export CSV */}
          <button
            onClick={() => setShowTable(!showTable)}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06] rounded-lg transition-colors cursor-pointer"
            title={showTable ? 'Masquer le tableau' : 'Afficher les données tabulaires'}
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportCSV}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06] rounded-lg transition-colors cursor-pointer"
            title="Exporter en CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06]">
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            Devis Reçus ({timeRange})
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="font-mono-data text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
              {totalPeriodQuotes}
            </span>
            <span className="text-[10px] font-mono-data font-semibold text-[#FF5500]">
              ~{Math.round(totalPeriodQuotes / displayedStats.length)}/mois
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06]">
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            Volume d'Affaires Estimé
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="font-mono-data text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
              {(totalPeriodValue / 1000).toFixed(0)}k €
            </span>
            <span className="text-[10px] font-mono-data font-semibold text-emerald-500">
              {globalSettings.defaultCurrency || 'EUR'}
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06]">
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            Devis Signés / Acceptés
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="font-mono-data text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {totalPeriodAccepted}
            </span>
            <span className="text-[11px] font-mono-data font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {avgConversionRate}% conv.
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06]">
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            Panier Moyen par Devis
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="font-mono-data text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
              {avgTicket.toLocaleString()} €
            </span>
            <span className="text-[10px] text-neutral-400">
              HT moyen
            </span>
          </div>
        </div>
      </div>

      {/* Main D3 Chart Container */}
      <div className="relative">
        {/* Dynamic Tooltip Header when hovering */}
        <div className="h-7 mb-2 flex items-center justify-between text-xs font-mono-data">
          {hoveredData ? (
            <div className="flex items-center gap-3 animate-in fade-in duration-150">
              <span className="font-bold text-neutral-900 dark:text-white">
                📅 {hoveredData.fullMonthName} :
              </span>
              <span className="text-[#FF5500] font-semibold">
                {hoveredData.totalQuotes} devis reçus
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-emerald-500 font-semibold">
                {hoveredData.acceptedQuotes} signés ({hoveredData.conversionRate}%)
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-amber-500 font-semibold">
                {hoveredData.totalValue.toLocaleString()} € prévisionnel
              </span>
            </div>
          ) : (
            <span className="text-neutral-400 text-[11px]">
              Survolez les barres ou la courbe pour afficher le détail du mois
            </span>
          )}

          {/* Chart Legend */}
          <div className="flex items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
            {metricMode === 'volume' && (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#FF5500]" />
                  <span>Total reçus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]" />
                  <span>Signés</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#10B981]" />
                  <span>% Transformation</span>
                </div>
              </>
            )}
            {metricMode === 'revenue' && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500]" />
                <span>Volume financier mensuel (€)</span>
              </div>
            )}
            {metricMode === 'conversion' && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]" />
                <span>Taux de conversion mensuel</span>
              </div>
            )}
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div ref={containerRef} className="w-full overflow-hidden select-none">
          <svg ref={svgRef} className="w-full overflow-visible"></svg>
        </div>
      </div>

      {/* Optional Table Breakdown */}
      {showTable && (
        <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] animate-in fade-in duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-black/[0.08] dark:border-white/[0.08] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                  <th className="pb-2.5">Période</th>
                  <th className="pb-2.5 text-right">Devis Reçus</th>
                  <th className="pb-2.5 text-right">Signés</th>
                  <th className="pb-2.5 text-right">Refusés</th>
                  <th className="pb-2.5 text-right">En Cours</th>
                  <th className="pb-2.5 text-right">Volume Financier</th>
                  <th className="pb-2.5 text-right">Ticket Moyen</th>
                  <th className="pb-2.5 text-right">Taux de Conv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] font-mono-data">
                {displayedStats.map((row) => (
                  <tr key={row.monthKey} className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 font-medium font-body text-neutral-900 dark:text-white">
                      {row.fullMonthName}
                    </td>
                    <td className="py-2.5 text-right font-bold text-neutral-900 dark:text-white">
                      {row.totalQuotes}
                    </td>
                    <td className="py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                      {row.acceptedQuotes}
                    </td>
                    <td className="py-2.5 text-right text-red-500 dark:text-red-400">
                      {row.declinedQuotes}
                    </td>
                    <td className="py-2.5 text-right text-blue-500 dark:text-blue-400">
                      {row.pendingQuotes}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-neutral-900 dark:text-white">
                      {row.totalValue.toLocaleString()} €
                    </td>
                    <td className="py-2.5 text-right text-neutral-500 dark:text-neutral-400">
                      {row.avgTicketValue.toLocaleString()} €
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {row.conversionRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
