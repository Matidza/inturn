


const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Sessions</p>
          <h2 className="text-2xl font-bold">24</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Earnings</p>
          <h2 className="text-2xl font-bold">R12,400</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Rating</p>
          <h2 className="text-2xl font-bold">4.8 ⭐</h2>
        </div>

      </div>

      {/* Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-3">Recent Activity</h3>

        <ul className="space-y-2 text-sm text-gray-600">
          <li>✔ Completed interview with John</li>
          <li>💰 Earned R300</li>
          <li>📅 New booking scheduled</li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;








// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Stack,
//   Avatar,
// } from "@mui/material";

// import {
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
//   BarChart,
//   Bar,
// } from "recharts";

// import {
//   CreditCard,
//   TrendingUp,
//   Calendar,
//   Star,
// } from "lucide-react";

// // import { useTheme } from "../../hooks/use-theme";
// import {
//   overviewData,
//   recentSalesData,
//   topProducts,
// } from "../../constants/professionals";

// const Dashboard = () => {
//   // const { theme } = useTheme();

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      
//       {/* ===== STATS ===== */}
//       <Grid container spacing={2}>
//         {[
//           {
//             title: "Total Sessions",
//             value: "1154",
//             icon: <Calendar size={24} />,
//             color: "#3b82f6",
//             growth: "25%",
//           },
//           {
//             title: "Total Earnings",
//             value: "R16,000",
//             icon: <Typography fontWeight="bold">R</Typography>,
//             color: "#22c55e",
//             growth: "12%",
//           },
//           {
//             title: "Average Ratings",
//             value: "4.8",
//             icon: <Star size={24} />,
//             color: "#f97316",
//             growth: "5.36%",
//           },
//           {
//             title: "This Month",
//             value: "340",
//             icon: <CreditCard size={24} />,
//             color: "#a855f7",
//             growth: "19%",
//           },
//         ].map((item, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>
//             <Card sx={{ borderRadius: 3 }}>
//               <CardContent>
//                 <Stack spacing={2}>
                  
//                   <Stack direction="row" spacing={2} alignItems="center">
//                     <Box
//                       sx={{
//                         p: 1.5,
//                         borderRadius: 2,
//                         bgcolor: `${item.color}20`,
//                         color: item.color,
//                       }}
//                     >
//                       {item.icon}
//                     </Box>
//                     <Typography fontSize={14} color="text.secondary">
//                       {item.title}
//                     </Typography>
//                   </Stack>

//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Typography variant="h5" fontWeight="bold">
//                       {item.value}
//                     </Typography>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       sx={{
//                         border: "1px solid",
//                         borderColor: "primary.main",
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: 5,
//                         color: "primary.main",
//                       }}
//                     >
//                       <TrendingUp size={16} />
//                       <Typography fontSize={12}>
//                         {item.growth}
//                       </Typography>
//                     </Stack>
//                   </Stack>

//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* ===== CHART + SESSIONS ===== */}
//       <Grid container spacing={2}>
        
//         {/* CHART */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ borderRadius: 3 }}>
//             <CardContent>
//               <Typography fontWeight="bold" mb={2}>
//                 Earnings Analytics
//               </Typography>

//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={overviewData}>
//                   <Tooltip formatter={(value) => `R${value}`} />
//                   <XAxis
//                     dataKey="name"
//                     stroke={theme === "light" ? "#475569" : "#94a3b8"}
//                   />
//                   <YAxis
//                     stroke={theme === "light" ? "#475569" : "#94a3b8"}
//                     tickFormatter={(v) => `R${v}`}
//                   />
//                   <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* UPCOMING SESSIONS */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ borderRadius: 3, height: "100%" }}>
//             <CardContent>
//               <Typography fontWeight="bold" mb={2}>
//                 Upcoming Sessions
//               </Typography>

//               <Stack spacing={2} sx={{ maxHeight: 300, overflow: "auto" }}>
//                 {recentSalesData.map((sale) => (
//                   <Stack
//                     key={sale.id}
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Avatar src={sale.image} />
//                       <Box>
//                         <Typography fontSize={14}>
//                           {sale.name}
//                         </Typography>
//                         <Typography fontSize={12} color="text.secondary">
//                           {sale.email}
//                         </Typography>
//                       </Box>
//                     </Stack>

//                     <Box textAlign="right">
//                       <Typography fontSize={12}>
//                         {sale.time}
//                       </Typography>
//                       <Typography fontSize={11} color="text.secondary">
//                         {sale.date}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 ))}
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* ===== REVIEWS ===== */}
//       <Card sx={{ borderRadius: 3 }}>
//         <CardContent>
//           <Typography fontWeight="bold" mb={2}>
//             Recent Reviews
//           </Typography>

//           <Stack spacing={2} sx={{ maxHeight: 400, overflow: "auto" }}>
//             {topProducts.map((product) => (
//               <Stack
//                 key={product.number}
//                 direction="row"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Avatar src={product.avatar} variant="rounded" />
//                   <Box>
//                     <Typography>{product.student}</Typography>
//                     <Typography fontSize={12} color="text.secondary">
//                       {product.review}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <Star size={16} color="#f59e0b" />
//                   <Typography>{product.rating}</Typography>
//                 </Stack>
//               </Stack>
//             ))}
//           </Stack>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Dashboard;









// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Stack,
//   Avatar,
// } from "@mui/material";

// import { BarChart } from "@mui/x-charts/BarChart";

// import {
//   CreditCard,
//   TrendingUp,
//   Calendar,
//   Star,
// } from "lucide-react";

// import {
//   overviewData,
//   recentSalesData,
//   topProducts,
// } from "../../constants/professionals";

// const Dashboard = () => {
//   // ✅ Prepare chart data
//   const chartValues = overviewData.map((item) => item.total);
//   const chartLabels = overviewData.map((item) => item.name);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      
//       {/* ===== STATS ===== */}
//       <Grid container spacing={2}>
//         {[
//           {
//             title: "Total Sessions",
//             value: "1154",
//             icon: <Calendar size={24} />,
//             color: "#3b82f6",
//             growth: "25%",
//           },
//           {
//             title: "Total Earnings",
//             value: "R16,000",
//             icon: <Typography fontWeight="bold">R</Typography>,
//             color: "#22c55e",
//             growth: "12%",
//           },
//           {
//             title: "Average Ratings",
//             value: "4.8",
//             icon: <Star size={24} />,
//             color: "#f97316",
//             growth: "5.36%",
//           },
//           {
//             title: "This Month",
//             value: "340",
//             icon: <CreditCard size={24} />,
//             color: "#a855f7",
//             growth: "19%",
//           },
//         ].map((item, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>
//             <Card sx={{ borderRadius: 3 }}>
//               <CardContent>
//                 <Stack spacing={2}>
                  
//                   <Stack direction="row" spacing={2} alignItems="center">
//                     <Box
//                       sx={{
//                         p: 1.5,
//                         borderRadius: 2,
//                         bgcolor: `${item.color}20`,
//                         color: item.color,
//                       }}
//                     >
//                       {item.icon}
//                     </Box>
//                     <Typography fontSize={14} color="text.secondary">
//                       {item.title}
//                     </Typography>
//                   </Stack>

//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Typography variant="h5" fontWeight="bold">
//                       {item.value}
//                     </Typography>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       sx={{
//                         border: "1px solid",
//                         borderColor: "primary.main",
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: 5,
//                         color: "primary.main",
//                       }}
//                     >
//                       <TrendingUp size={16} />
//                       <Typography fontSize={12}>
//                         {item.growth}
//                       </Typography>
//                     </Stack>
//                   </Stack>

//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* ===== CHART + SESSIONS ===== */}
//       <Grid container spacing={2}>
        
//         {/* CHART */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ borderRadius: 3 }}>
//             <CardContent>
//               <Typography fontWeight="bold" mb={2}>
//                 Earnings Analytics
//               </Typography>

//               <BarChart
//                 height={300}
//                 series={[
//                   {
//                     data: chartValues,
//                     label: "Earnings",
//                   },
//                 ]}
//                 xAxis={[
//                   {
//                     scaleType: "band",
//                     data: chartLabels,
//                   },
//                 ]}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* UPCOMING SESSIONS */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ borderRadius: 3, height: "100%" }}>
//             <CardContent>
//               <Typography fontWeight="bold" mb={2}>
//                 Upcoming Sessions
//               </Typography>

//               <Stack spacing={2} sx={{ maxHeight: 300, overflow: "auto" }}>
//                 {recentSalesData.map((sale) => (
//                   <Stack
//                     key={sale.id}
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Avatar src={sale.image} />
//                       <Box>
//                         <Typography fontSize={14}>
//                           {sale.name}
//                         </Typography>
//                         <Typography fontSize={12} color="text.secondary">
//                           {sale.email}
//                         </Typography>
//                       </Box>
//                     </Stack>

//                     <Box textAlign="right">
//                       <Typography fontSize={12}>
//                         {sale.time}
//                       </Typography>
//                       <Typography fontSize={11} color="text.secondary">
//                         {sale.date}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 ))}
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* ===== REVIEWS ===== */}
//       <Card sx={{ borderRadius: 3 }}>
//         <CardContent>
//           <Typography fontWeight="bold" mb={2}>
//             Recent Reviews
//           </Typography>

//           <Stack spacing={2} sx={{ maxHeight: 400, overflow: "auto" }}>
//             {topProducts.map((product) => (
//               <Stack
//                 key={product.number}
//                 direction="row"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Avatar src={product.avatar} variant="rounded" />
//                   <Box>
//                     <Typography>{product.student}</Typography>
//                     <Typography fontSize={12} color="text.secondary">
//                       {product.review}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <Star size={16} color="#f59e0b" />
//                   <Typography>{product.rating}</Typography>
//                 </Stack>
//               </Stack>
//             ))}
//           </Stack>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Dashboard;