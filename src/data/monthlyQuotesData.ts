import { QuoteRequest, MonthlyQuoteStat } from '../types';

export function computeMonthlyQuoteStats(liveQuotes: QuoteRequest[]): MonthlyQuoteStat[] {
  const now = new Date();
  const statsMap = new Map<string, MonthlyQuoteStat>();

  for (let offset = 11; offset >= 0; offset -= 1) {
    const month = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
    const fullMonthName = month.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

    statsMap.set(monthKey, {
      monthKey,
      monthLabel: month.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
      fullMonthName,
      totalQuotes: 0,
      acceptedQuotes: 0,
      declinedQuotes: 0,
      pendingQuotes: 0,
      totalValue: 0,
      avgTicketValue: 0,
      conversionRate: 0
    });
  }

  for (const quote of liveQuotes) {
    const date = new Date(quote.date);
    if (Number.isNaN(date.getTime())) continue;

    const monthKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    const monthStats = statsMap.get(monthKey);
    if (!monthStats) continue;

    monthStats.totalQuotes += 1;
    monthStats.totalValue += quote.estimatedAmount || 0;

    if (quote.status === 'accepted') {
      monthStats.acceptedQuotes += 1;
    } else if (quote.status === 'declined') {
      monthStats.declinedQuotes += 1;
    } else {
      monthStats.pendingQuotes += 1;
    }

    monthStats.avgTicketValue = Math.round(monthStats.totalValue / monthStats.totalQuotes);
    monthStats.conversionRate = Math.round((monthStats.acceptedQuotes / monthStats.totalQuotes) * 100);
  }

  return Array.from(statsMap.values());
}
