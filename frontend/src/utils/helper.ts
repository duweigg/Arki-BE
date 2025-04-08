import { Portfolio } from "@/model/model";

export function formatMoney(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

function getTotalProfit(portfolio: Portfolio): number {
    return portfolio.historicalValues[portfolio.historicalValues.length - 1]?.value - portfolio.historicalValues[0]?.value
}

export function getTotalProfitText(portfolio: Portfolio): string {
    const totalProfit = getTotalProfit(portfolio);
    return (totalProfit > 0 ? "+" : "-") + "S$" + totalProfit.toFixed(2).toString()
}
export function getTotalProfitPercentage(portfolio: Portfolio): string {
    const totalProfit = getTotalProfit(portfolio);
    return (totalProfit > 0 ? "+" : "-") + (totalProfit / portfolio.portfolioValue).toFixed(2).toString() + "%"
}
export function getAvgMonthlyProfitText(portfolio: Portfolio): string {
    const totalProfit = getTotalProfit(portfolio);
    return (totalProfit > 0 ? "+" : "-") + "S$" + (totalProfit / portfolio.historicalValues.length).toFixed(2).toString()
}
export function getAvgMonthlyProfitPercentage(portfolio: Portfolio): string {
    const totalProfit = getTotalProfit(portfolio);
    return (totalProfit > 0 ? "+" : "-") + (totalProfit / portfolio.historicalValues.length / portfolio.portfolioValue).toFixed(2).toString() + "%"
}