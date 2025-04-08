'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js';
import ChatComponent from '../../components/chatComponent';
import { Investment, Portfolio, Role } from '@/model/model';
import { imageDomain, investmentUrl, portfolioUrl } from '@/api/url';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { Card } from '@mui/material';
import { formatMoney, getAvgMonthlyProfitPercentage, getAvgMonthlyProfitText, getTotalProfitPercentage, getTotalProfitText } from '@/utils/helper';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { ChatDataDetailComponent } from '@/components/chatDataDetailComponent';
import { TooltipItem } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function Dashboard() {
    const router = useRouter();
    const [portfolio, setPortfolio] = useState<Portfolio>()
    const [investment, setInvestment] = useState<Investment[]>()
    const [role, setRole] = useState<Role | null>()
    const [username, setUsername] = useState<string | null>()
    const [childId, setChildId] = useState<string | null>()

    useEffect(() => {
        const role = sessionStorage.getItem('role') as Role | null;
        const username = sessionStorage.getItem('name');
        const childId = sessionStorage.getItem('childId');
        setRole(role)
        setUsername(username)
        setChildId(childId)
    }, [])

    useEffect(() => {
        const getPortfolioData = async () => {
            fetch(portfolioUrl + "/" + childId)
                .then(res => res.json())
                .then(data => setPortfolio(data));
        }
        if (childId) {
            getPortfolioData()
        }
    }, [childId])
    useEffect(() => {
        const getInvestmentData = async () => {
            fetch(investmentUrl + "/" + childId)
                .then(res => res.json())
                .then(data => setInvestment(data));
        }
        if (childId) {
            getInvestmentData()
        }
    }, [childId])

    if (portfolio == undefined || investment == undefined) {
        return <div
            className="min-h-screen bg-cover bg-center flex-col items-center justify-center p-20"
            style={{ backgroundImage: "url('/assets/login_bg.jpg')" }}
        />
    }
    const chartConfig = {
        labels: portfolio.historicalValues.map((v) => v.date),
        datasets: [
            {
                label: 'Investment Growth',
                data: portfolio.historicalValues.map((v) => v.value),
                borderColor: '#3b82f6',
                tension: 0.5,
                pointRadius: 3,
                pointHitRadius: 20,
                pointHoverRadius: 6,
                pointHoverBorderWidth: 2,
            },
        ],
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: true, // ✅ default is true, but make sure it's not disabled
                    callbacks: {
                        label: function (context: TooltipItem<'line'>) {
                            const value = context.raw as number;
                            return `Value: S$${value.toLocaleString()}`; // customize label
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false, // ❌ hides x-axis grid lines
                    },
                },
                y: {
                    grid: {
                        display: false, // ❌ hides y-axis grid lines
                        drawBorder: false,
                    },
                    ticks: {
                        display: false
                    },
                    border: {
                        display: false,     // ❌ Hide new Chart.js v4 border option
                    },
                },
            },
        },
    };
    const handleLogout = () => {
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('familyId')
        sessionStorage.removeItem('childId')
        router.push(`/login`);
    };
    return (
        <div
            className="min-h-screen bg-cover bg-center flex-col items-center justify-center p-20 min-w-200"
            style={{ backgroundImage: "url('/assets/login_bg.jpg')" }}
        >
            <div className="flex justify-between mb-20">
                <div className="text-2xl font-bold mb-4">
                    Welcome, {username} ({role})
                </div>
                <Button variant="contained" onClick={handleLogout} >Logout </Button>
            </div>
            <div className="p-10 bg-white/50 backdrop-blur-md shadow-lg  h-fit min-w-180">
                <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                <div className="mb-6 flex justify-center flex-wrap">
                    <Card className=' p-10 w-1/2 min-w-150'>
                        <p className="text-2xl mb-2 font-bold">Evaluation</p>
                        <p className="text-xl mb-2">Total assets</p>
                        <div className="text-xl mb-2 flex items-end">
                            <strong>S{formatMoney(portfolio.portfolioValue).slice(0, -3)}</strong>
                            <span className='text-sm mr-1'>{portfolio.portfolioValue.toFixed(2).slice(-3)}</span>
                            <div className='text-xs bg-green-300 rounded font-bold p-0.5 flex mr-0.5 px-1'>
                                <KeyboardDoubleArrowUpIcon sx={{ fontSize: 15 }} />
                                {(portfolio.monthlyChange / portfolio.portfolioValue).toFixed(2)}%
                            </div>
                            <div className='text-xs bg-green-300 rounded font-bold p-0.5 px-1'>S{formatMoney(portfolio.monthlyChange)}</div>
                        </div>
                        <div className="w-full max-w-md h-64 mb-10 mx-auto">
                            <Line data={chartConfig} options={chartConfig.options} />
                        </div>
                        <div className="grid grid-cols-3">
                            <ChatDataDetailComponent
                                title="Total Profit"
                                data={getTotalProfitText(portfolio)}
                                subData={getTotalProfitPercentage(portfolio)}
                            />
                            <ChatDataDetailComponent
                                title="Avg. monthly growing"
                                data={getAvgMonthlyProfitPercentage(portfolio)}
                                subData={getAvgMonthlyProfitText(portfolio)} />
                            <ChatDataDetailComponent title="Best-profit token" data={investment[0].name} subData={investment[0].symbol} />
                            <div className="col-span-3 border-t border-gray-300 my-5 w-11/12 m-auto" />
                            <ChatDataDetailComponent title="Profile Score" data="69/100" subData="Good" />
                            <ChatDataDetailComponent title="AIRA" data="74%" subData="Rebalance accuracy" />
                            <ChatDataDetailComponent title="PRI" data="0.45" subData="Resilience index: Risky" />

                        </div>
                    </Card>
                    <Card className=' p-10 w-1/2 min-w-150'>
                        <h2 className="text-lg font-semibold mb-2">Investment You Own:</h2>
                        <ul className="mb-6">
                            {investment.map((invest, idx) => (
                                <div key={idx} className="border p-4 rounded shadow text-center mb-2">
                                    <div className='flex gap-4 items-center'>
                                        <div>
                                            <Image
                                                alt={invest.name}
                                                width={40}
                                                height={40}
                                                className="object-contain w-10 h-10 rounded"
                                                src={imageDomain + invest.logoUrl} />
                                            <span>{invest.symbol}</span>
                                        </div>
                                        <div>{invest.funFact}</div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
            <ChatComponent />
        </div>
    );
}
