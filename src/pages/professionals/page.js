import { ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

import { useTheme } from "../../hooks/use-theme";

import { overviewData, recentSalesData, topProducts } from "../../constants";

//import { Footer } from "../../layouts/Footer";

import { CreditCard, Star, TrendingUp, Calendar, StarIcon } from "lucide-react";

const Dashboard = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-y-4">
            {/* <h1 className="title">Dashboard</h1> */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card max-h-36  gap-y-5">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-500/20 dark:text-blue-500">
                            <Calendar size={26} />
                        </div>
                        <p className="card-title">Total Sessions</p>
                    </div>
                    <div className="card-header bg-white transition-colors dark:bg-slate-950">
                        <div>
                            <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">1154</p>
                        </div>
                        
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            25%
                        </span>
                    </div>
                </div>
                <div className="card max-h-36  gap-y-5">
                    <div className="card-header">
                        <div className="rounded-lg bg-green-500/20 p-2 text-green-500 transition-colors dark:bg-green-500/20  dark:text-green-600">
                            <h1 className="text-xl font-bold" size={26}>R</h1>
                            {/* <DollarSign size={26} /> */}
                        </div>
                        <p className="card-title">Total Earnings</p>
                    </div>
                    <div className="card-header bg-white transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">R16,000</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            12%
                        </span>
                    </div>
                </div>
                <div className="card max-h-36  gap-y-5">
                    <div className="card-header">
                        <div className="rounded-lg bg-orange-500/20 p-2 text-orange-500 transition-colors dark:bg-orange-600/20 dark:text-orange-500">
                            <StarIcon size={26} />
                        </div>
                        <p className="card-title">Average Ratings</p>
                    </div>
                    <div className="card-header bg-white transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">4.8</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            5.36%
                        </span>
                    </div>
                </div>
                <div className="card max-h-36  gap-y-5">
                    <div className="card-header">
                        <div className="rounded-lg bg-purple-500/20 p-2 text-purple-600 transition-colors dark:bg-purple-600/20 dark:text-purple-600">
                            <CreditCard size={26} />
                        </div>
                        <p className="card-title">This Month</p>
                    </div>
                    <div className="card-header gap-x-10 bg-white  transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            340
                        </p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            19%
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Earnings Analytics</p>
                    </div>
                    <div className="card-body p-0">
                        
                        {/* <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart data={overviewData}>
                                <XAxis
                                dataKey="name"
                                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                />
                                <YAxis
                                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                tickFormatter={(value) => `R${value}`}
                                />
                                <Tooltip formatter={(value) => `R${value}`} />
                                <Bar dataKey="total" barSize={20} fill="#2563eb" radius={[6, 6, 0, 0]} />
                                <Line type="monotone" dataKey="total" stroke="#94a3b8" strokeWidth={2} />
                            </ComposedChart>
                        </ResponsiveContainer> */}

                        {/* <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={overviewData}>
                            <XAxis
                                dataKey="name"
                                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                tickMargin={6}
                            />
                            <YAxis
                                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                tickFormatter={(value) => `R${value}`}
                                tickMargin={6}
                            />
                            <Tooltip formatter={(value) => `R${value}`} />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            </LineChart>
                        </ResponsiveContainer> */}

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={overviewData}
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                            >
                                <Tooltip formatter={(value) => `R${value}`} />
                                <XAxis
                                dataKey="name"
                                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                tickMargin={6}
                                />
                                <YAxis
                                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                tickFormatter={(value) => `R${value}`}
                                tickMargin={6}
                                />
                                <Bar dataKey="total" fill="#2563eb" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>

                        {/* <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart
                                data={overviewData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorTotal"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#2563eb"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#2563eb"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    cursor={false}
                                    formatter={(value) => `$${value}`}
                                />

                                <XAxis
                                    dataKey="name"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickMargin={6}
                                />
                                <YAxis
                                    dataKey="total"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickFormatter={(value) => `R${value}`}
                                    tickMargin={6}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer> */}
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header">
                        <p className="card-title">Upcoming Interview Sessions</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {recentSalesData.map((sale) => (
                            <div
                                key={sale.id}
                                className="flex items-center justify-between gap-x-4 py-2 pr-2"
                            >
                                <div className="flex items-center gap-x-4">
                                    <img
                                        src={sale.image}
                                        alt={sale.name}
                                        className="size-10 flex-shrink-0 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col gap-y-1">
                                        <p className="font-medium text-slate-900 dark:text-slate-50">{sale.name}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{sale.email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <p className="font-small text-slate-800 dark:text-slate-50">{sale.time}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{sale.date}</p>
                                </div>       
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Recent Reviews</p>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    {/* <th className="table-head">#</th> */}
                                    {/* <th className="table-head">Product</th> */}
                                    {/* <th className="table-head">Price</th> */}
                                    {/* <th className="table-head">Status</th> */}
                                    {/* <th className="table-head">Rating</th> */}
                                    {/* <th className="table-head">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {topProducts.map((product) => (
                                    <tr
                                        key={product.number}
                                        className="table-row"
                                    >
                                        {/* <td className="table-cell">{product.number}</td> */}
                                        <td className="table-cell">
                                            <div className="flex w-max gap-x-4">
                                                <img
                                                    src={product.avatar}
                                                    alt={product.student}
                                                    className="size-14 rounded-lg object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <p>{product.student}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">{product.review}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td className="table-cell">${product.price}</td> */}
                                        {/* <td className="table-cell">{product.status}</td> */}
                                        <td className="table-cell">
                                            <div className="flex items-center gap-x-2">
                                                <Star
                                                    size={18}
                                                    className="fill-yellow-600 stroke-yellow-600"
                                                />
                                                {product.rating}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           {/* <Footer /> */}
        </div>
    );
};

export default Dashboard;