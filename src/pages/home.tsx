// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Stack,
//   CardMedia,
//   Container
// } from "@mui/material";


// import { Link } from "react-router-dom";
// import {  signup, prepare, landit } from "../assets";
// import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import { KeyboardArrowRight, GifBox, HandshakeOutlined } from "@mui/icons-material";

// import ty from "../assets/ty.jpg"
// import test from "../assets/test.mp4"
// const variants = [
//   {
//     title: "Color 1 – Vibrant (High Energy)",
//     accent: "#d946ef",
//     bg: "#fdf2fb",
//   },
//   {
//     title: "Color 2 – Trust (Balanced SaaS)",
//     accent: "#6366f1",
//     bg: "#eef2ff",
//   },
//   {
//     title: "Color 3 – Premium (Your current)",
//     accent: "#7f42e7",
//     bg: "#f5f0fd",
//   },
// ];

// const Home = () => {

//   return (
//     <Box >
//       {/* HERO / BANNER */}
//       <Box 
//         sx={{
//           backgroundColor: "#f5f0fd",
//           px: { xs: 2, md: 4 },
//           py: 4,
//         }}
//       >
//         <Grid container>
//           {/* LEFT CONTENT */}
//           <Grid item xs={12} md={6}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               p: { xs: 2, md: 4 },
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: { xs: "2rem", md: "3.5rem" },
//                 fontWeight: 800,
//                 lineHeight: 1.1,
//                 color: "#05050B",
//               }}
//             >
//               Master{" "}
//               <Box component="span" sx={{ color: "#7f42e7" }}>
//                 interviews
//               </Box>{" "}
//               before they matter
//             </Typography>

//             <Typography mt={2} fontSize={14} color="#05050B">
//               Inturn uses AI for AI-powered interviews to simulate real-world
//               scenarios, analyzes and optimize your CV to pass Applicant Tracking Systems (ATS).
//               Step into live mock interviews with experienced
//               professionals in your field — and get actionable feedback that prepares
//               you for real opportunities.
//             </Typography>

//             <Stack direction="row" spacing={2} mt={3}>
//               <Button
//                 variant="contained"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   fontWeight: 600,
//                   background: "#7f42e7",
//                   color: "#fff",
//                   "&:hover": {
//                     opacity: 0.9,
//                     background: "#7f42e7",
//                   },
//                 }}
//               >
//                 Start practicing
//               </Button>

//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   borderColor: "#7f42e7",
//                   color: "#7f42e7",
//                   fontWeight: 600,
//                   "&:hover": {
//                     background: "#7f42e7",
//                     color: "#fff",
//                   },
//                 }}
//               >
//                 Learn more
//               </Button>
//             </Stack>
//           </Grid>

//           {/* RIGHT VISUAL PLACEHOLDER */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               display: { xs: "none", md: "flex" },
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               sx={{
//                 width: "100%",
//                 height: 250,
//                 borderRadius: 4,
//                 // background: `linear-gradient(135deg, #6366f1, #d946ef, #ffffff)`,
//                 // opacity: 0.9,
//                 backgroundImage: `url(${ty})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 position: "relative",
//                 overflow: "hidden", 
//               }}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Three tools that work */}
//       <Box sx={{ px: { xs: 2, md: 4 }, py: 7, background: "#FFFFFF", borderBottom: 1, borderColor: "#ebebebff"  }}>
//         <Stack direction="column" gap={1}>
//             {/* <Typography variant="h6" textAlign="center" fontWeight="semi-bold" color="#171717ff">
//               Core
//             </Typography> */}
//             <Typography variant="h4" textAlign="center" fontWeight="bold" color="#05050B">
//               Three tools that work
//             </Typography>
//             <Typography variant="h6" textAlign="center" fontWeight="regular" color="#727272ff">
//               Everything you need to prepare
//             </Typography>
//         </Stack>     
//         <Grid container spacing={4} mt={3}  mb={11}>
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 height: 300,
//                 // backgroundImage: `url(${signup})`,
//                 background: "#f5f0fdff",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 position: "relative",
//                 overflow: "hidden",
//                 borderRadius: 4,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 p: { xs: 2, md: 6 }
//               }}
//             >
//               <Typography fontSize={16} textAlign="start" fontWeight="bold" color="#05050B">
//                 First
//               </Typography>
//               <Box>
//                 <Typography
//                   sx={{
//                     fontFamily: "",
//                     fontSize: { xs: "2.2rem", md: "3rem"},
//                     fontWeight: 700,
//                     color: "#05050B"
//                   }}
//                 >
//                   AI Interview practice 
//                 </Typography>
//               </Box>
//               <Typography color="#05050B" fontSize={14}>
//                 Run through questions anytime, anywhere. Get instant feedback on your answers.
//               </Typography>

//             <Stack direction="row" spacing={2} mt={3}>
//               <Button
//                 component={Link} to="/ai-practice"
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   fontWeight: 600,
//                   borderColor: "#dad8d8ff",
//                   color: "#FFFFFF",
//                   background: "#7f42e7ff",
//                   // f3ebffff
//                   "&:hover": {
//                     opacity: 0.9,
//                     background: "#7f42e7",
//                   },
//                 }}
//               >
//                 Practicing
//               </Button>
//               <Button
//                 component={Link} to="/more-about-ai"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   color: "#7f42e7ff",
//                   fontWeight: 600,
//                   "&:hover": {
//                     background: "#7f42e7",
//                     color: "#fff",
//                   },
//                 }}
//               >
//                 Learn more < KeyboardArrowRight />
//               </Button>
//             </Stack>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Stack direction="row"  spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     height: 300,
//                     // backgroundImage: `url(${prepare})`,
//                     background: "#f5f0fdff",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     position: "relative",
//                     borderRadius: 4,
//                     justifyContent: "center",
//                     p: { xs: 2, md: 3 },
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Typography variant="h6" textAlign="start" fontWeight="semi-bold" color="#05050B">
//                     <HandshakeOutlined sx={{ fontSize: 28 }} />
//                   </Typography>
//                   <Box mt={2}>   
//                     <Typography
//                       sx={{
//                         fontFamily: "",
//                         fontSize: { xs: "2.2rem", md: "1.6rem" },
//                         fontWeight: 700,
//                         color: "#05050B",
//                         lineHeight: 1.1,
//                       }}
//                     >
//                       CV analysis
//                     </Typography>
//                     <Typography color="#05050B" fontSize={13}>
//                       See what works. Improve what doesn't. Pass the ATS on the first go
//                     </Typography> 
//                   </Box>
                             
//                     <Button
//                       // variant=""
//                       component={Link} to="/more-about-cv-analysis"
//                       sx={{
//                         borderRadius: 5,
//                         textTransform: "none",
//                         fontWeight: 600,
//                         maxWidth: 100,
//                         borderColor: "#e8e8e8ff",
//                         color: "#7f42e7ff",
//                         justifyContent: "center",
//                         mt: 13,
//                         "&:hover": {
//                           background: "#7f42e7",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       Explore < KeyboardArrowRight  sx={{ mt: -0.2}}/>
//                     </Button>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     height: 300,
//                     // backgroundImage: `url(${landit})`,
//                     background: "#f5f0fdff",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     position: "relative",
//                     borderRadius: 4,
//                     justifyContent: "center",
//                     p: { xs: 2, md: 3 },
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Typography variant="h6" textAlign="start" fontWeight="semi-bold" color="#05050B">
//                     <HandshakeOutlined sx={{ fontSize: 28 }} />
//                   </Typography>
//                   <Box mt={2}>   
//                     <Typography
//                       sx={{
//                         fontFamily: "",
//                         fontSize: { xs: "2.2rem", md: "1.6rem" },
//                         fontWeight: 700,
//                         color: "#000000ff",
//                         lineHeight: 1.1
//                       }}
//                     >
                     
//                      Real mock interviews
//                     </Typography>
//                     <Typography color="#05050B" fontSize={13}>
//                       Talk to actual recruiters. Get real experience
//                     </Typography> 
//                   </Box>
                             
//                     <Button
//                     component={Link} to="/mre-about-real-professionals"
//                       sx={{
//                         borderRadius: 5,
//                         textTransform: "none",
//                         fontWeight: 600,
//                         maxWidth: 100,
//                         // borderColor: "#e8e8e8ff",
//                         color: "#7f42e7ff",
//                         justifyContent: "center",
//                         mt: 10,
//                         "&:hover": {
//                           background: "#7f42e7",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       Explore < KeyboardArrowRight  sx={{ mt: -0.2}}/>
//                     </Button>
//                 </Box>
//               </Grid>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Sign up  */}
//       <Box sx={{  backgroundColor: "#FFFFFF",px: { xs: 2, md: 6 }, py: { xs: 6, md: 5 }, borderBottom: 1, borderColor: "#cbcbcbff", color: "#040101ff"  }}>
//         <Typography  textAlign="start" fontWeight="bold" fontSize={18} color="#b893f6ff">
//           01 Sign up
//         </Typography>
//         <Grid
//           container
//           // spacing={4}
//           sx={{
//             // border: "1px solid #e2e2e2ff",
//             // borderRadius: 4,
//             overflow: "hidden",
//             width: "100%",
//           }}
//         >
//           <Grid
//             item xs={12} md={6}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               p: { xs: 2, md: 6 },
//             }}
//           >
//             <Typography fontSize={17} textAlign="start" fontWeight="bold">
//               Start
//             </Typography>
//             <Box> 
//                 <Typography  
//                   sx={{
//                     fontFamily: "",
//                     fontSize: { xs: "2.2rem", md: "3rem" },
//                     fontWeight: 700,
//                     lineHeight: 1.1,
//                   }}
//                 >
//                   Create your account in seconds
//                 </Typography> 
//               <Typography sx={{ mt: 2 }}>
//                 Join inTurn and setup your profile. Tell us about your goals and roles you're chasing.
//               </Typography>

//             <Stack direction="row" spacing={2} mt={3}>
//               <Button
//                 component={Link} to="/login"
//                 variant="contained"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   fontWeight: 600,
//                   background: "#7f42e7ff",
//                   "&:hover": {
//                     opacity: 0.9,
//                     background: "#7f42e7",
//                   },
//                   // background: "linear-gradient(90deg, #b893f6ff, #7f42e7ff)"
//                 }}
//               >
//                 Begin
//               </Button>

//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   borderColor: "#7f42e7",
//                   color: "#7f42e7",
//                   fontWeight: 600,
//                   "&:hover": {
//                     background: "#7f42e7",
//                     color: "#fff",
//                   },
//                 }}
                
//               >
//                 Learn more < KeyboardArrowRight />
//               </Button>
//             </Stack>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6} sx={{ display:  { xs: "none", md: "flex" }}}>
//             <CardMedia
//               component="img"
//               image={signup}
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: { xs: "none", md: "flex" },
//                 borderRadius: 3,
//               }}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Practice hard  */}
//       <Box sx={{  backgroundColor: "#FFFFFF",px: { xs: 2, md: 6 }, py: { xs: 6, md: 5 }, borderBottom: 1, borderColor: "#cbcbcbff", color: "#040101ff"  }}>
//         <Typography  textAlign="start" fontWeight="bold" fontSize={18} color="#b893f6ff">
//           02 Practice hard
//         </Typography>
//         <Grid
//           container
//           // spacing={4}
//           sx={{
//             // border: "1px solid #e2e2e2ff",
//             // borderRadius: 4,
//             overflow: "hidden",
//             width: "100%",
//           }}
//         >
//           <Grid
//             item xs={12} md={6}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               p: { xs: 2, md: 6 },
//             }}
//           >
//             <Typography fontSize={17} textAlign="start" fontWeight="bold">
//               Prepare
//             </Typography>
//             <Box> 
//               <Typography  
//                 sx={{
//                   fontFamily: "",
//                   fontSize: { xs: "2.2rem", md: "3rem" },
//                   fontWeight: 700,
//                   lineHeight: 1.1,
//                 }}
//               >
//                 Work with AI and real interviews
//               </Typography> 
//               <Typography sx={{ mt: 2 }}>
//                 Use AI to drill common questions. Schedule mock interviews with professionals. Watch your skills sharpen.
//               </Typography>

//               <Stack direction="row" spacing={2} mt={3}>
//                 <Button
//                   component={Link} to="/ai-practice"
//                   variant="contained"
//                   sx={{
//                     borderRadius: 5,
//                     textTransform: "none",
//                     fontWeight: 600,
//                     background: "#7f42e7ff",
//                     "&:hover": {
//                     opacity: 0.9,
//                     background: "#7f42e7",
//                   },
//                     // background: "linear-gradient(90deg, #b893f6ff, #7f42e7ff)"
//                   }}
//                 >
//                   Train
//                 </Button>

//                 <Button
//                   component={Link} to="/more-about-ai"
//                   variant="outlined"
//                   sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   borderColor: "#7f42e7",
//                   color: "#7f42e7",
//                   fontWeight: 600,
//                   "&:hover": {
//                     background: "#7f42e7",
//                     color: "#fff",
//                   },
//                 }}
//                 >
//                   Learn more < KeyboardArrowRight />
//                 </Button>
//               </Stack>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6} sx={{ display:  { xs: "none", md: "flex" }}}>
//             <CardMedia
//               component="img"
//               image={prepare}
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: { xs: "none", md: "flex" },
//                 borderRadius: 3,
//               }}
//             />
//           </Grid>
//         </Grid>
//       </Box>
      
//       {/* Land it  */}
//       <Box sx={{  backgroundColor: "#FFFFFF",px: { xs: 2, md: 6 }, py: { xs: 6, md: 5 }, borderBottom: 1, borderColor: "#ebebebff", color: "#040101ff"   }}>
//         <Typography  textAlign="start" fontWeight="bold" fontSize={18} color="#b893f6ff">
//           03 Land it
//         </Typography>
//         <Grid
//           container
//           // spacing={4}
//           sx={{
//             // border: "1px solid #e2e2e2ff",
//             // borderRadius: 4,
//             overflow: "hidden",
//             width: "100%",
//           }}
//         >
//           <Grid
//             item xs={12} md={6}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               p: { xs: 2, md: 6 },
//             }}
//           >
//             <Typography fontSize={17} textAlign="start" fontWeight="bold">
//               Succeed
//             </Typography>
//             <Box> 
//               <Typography  
//                 sx={{
//                   fontFamily: "",
//                   fontSize: { xs: "2.2rem", md: "3rem" },
//                   fontWeight: 700,
//                   lineHeight: 1.1,
//                 }}
//               >
//                 Walk into interviews with confidence
//               </Typography> 
//               <Typography sx={{ mt: 2 }}>
//                You've practiced. You've learned. Now you're ready. Get the job.
//               </Typography>

//               <Stack direction="row" spacing={2} mt={3}>
//                 <Button
//                   component={Link} to="/job-applications"
//                   variant="contained"
//                   sx={{
//                     borderRadius: 5,
//                     textTransform: "none",
//                     fontWeight: 600,
//                     background: "#7f42e7ff",
//                     "&:hover": {
//                     opacity: 0.9,
//                     background: "#7f42e7",
//                   },
//                     // background: "linear-gradient(90deg, #b893f6ff, #7f42e7ff)"
//                   }}
//                 >
//                   Apply
//                 </Button>

//                 <Button
//                   component={Link} to="/more-about-applications"
//                   variant="outlined"
//                   sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   borderColor: "#7f42e7",
//                   color: "#7f42e7",
//                   fontWeight: 600,
//                   "&:hover": {
//                     background: "#7f42e7",
//                     color: "#fff",
//                   },
//                 }}
//                 >
//                   Learn more < KeyboardArrowRight  sx={{ mt: -0.1}}/>
//                 </Button>
//               </Stack>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6} sx={{ display:  { xs: "none", md: "flex" }}}>
//             <CardMedia
//               component="img"
//               image={landit}
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: { xs: "none", md: "flex" },
//                 borderRadius: 3,
//               }}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Built For Everyone */}
//       <Box sx={{ px: { xs: 2, md: 4 }, py: 4, background: "#f5f0fdff", color: "#05050B" }}>
//         <Stack direction="column" gap={2}>
//             <Typography variant="h6" textAlign="center" fontWeight="semi-bold" >
//               Why
//             </Typography>
//             <Typography variant="h4" textAlign="center" fontWeight="bold" color="#05050B">
//               Built for everyone
//             </Typography>
//             <Typography variant="h6" textAlign="center" fontWeight="regular">
//               Everyone  gets what they need
//             </Typography>
//         </Stack>

//         <Grid container spacing={4} mt={2} mb={8}>
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 height: 300,
//                 // backgroundImage: `url(${ house})`,
//                 background: "#FFFFFF",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 position: "relative",
//                 borderRadius: 4,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 p: { xs: 2, md: 6 },
//                 // background: "linear-gradient(90deg, #b893f6ff, #7f42e7ff)"    
//               }}
//             >
//               <Typography variant="h6" textAlign="start" fontWeight="semi-bold"  color="##05050B">
//                 Students
//               </Typography>
//               <Box>             
//                 <Typography
//                   sx={{
//                     fontFamily: "",
//                     fontSize: { xs: "2.2rem", md: "3rem" },
//                     fontWeight: 700,
//                     color: "##05050B",
//                     lineHeight: 1.1
//                   }}
//                 >
//                   Gain real interview experience
//                 </Typography>
//               </Box>
              
//               <Typography color="#05050B" fontSize={14}>
//                 Practice with AI and real professionals. Get feedback that matters. Build confidence
//               </Typography>

//               <Stack direction="row" spacing={2} mt={3}>
//                 <Button
//                   component={Link} to="/login"
//                   variant="outlined"
//                   sx={{
//                     borderRadius: 5,
//                     textTransform: "none",
//                     fontWeight: 600,
//                     borderColor: "#e8e8e8ff",
//                     background: "#7f42e7ff",
//                     color: "#FFFFFF",
//                     "&:hover": {
//                       opacity: 0.9,
//                       background: "#7f42e7",
//                     },     
//                   }}
//                 >
//                   Start Now
//                 </Button>
//                 {/* <Button
//                   sx={{
//                     borderRadius: 5,
//                     textTransform: "none",
//                     color: "#05050B",
//                     fontWeight: 600,
//                     "&:hover": {
//                       background: "#b893f6ff", color: "#FFFFFF"
//                     },
//                   }}
//                 >
//                   Learn more < KeyboardArrowRight sx={{ mt: -0.2}}/>
//                 </Button> */}
//               </Stack>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Stack direction="row"  spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     height: 300,
//                     // backgroundImage: `url(${ house})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     position: "relative",
//                     background: "#FFFFFF",
//                     // background: "linear-gradient(90deg, #b893f6ff, #7f42e7ff)"    
//                     borderRadius: 4,
//                     justifyContent: "center",
//                     p: { xs: 2, md: 3 },
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Typography variant="h6" textAlign="start" fontWeight="semi-bold" color="#05050B">
//                     <HandshakeOutlined sx={{ fontSize: 28 }} />
//                   </Typography>
//                   <Box mt={2}>   
//                     <Typography
//                       sx={{
//                         fontFamily: "",
//                         fontSize: { xs: "2.2rem", md: "1.6rem" },
//                         fontWeight: 700,
//                         color: "#05050B",
//                         lineHeight: 1.1
//                       }}
//                     >
//                       Professioals
//                     </Typography>
//                     <Typography color="#05050B" fontSize={13}>
//                       Help build talent worth hiring
//                     </Typography> 
//                   </Box>
                             
//                     <Button
//                       // variant=""
//                       component={Link} to="/professional-portal"
//                       sx={{
//                         borderRadius: 5,
//                         textTransform: "none",
//                         fontWeight: 600,
//                         // borderColor: "#e8e8e8ff",
//                         color: "#7f42e7ff",
//                         maxWidth: 100,
//                         justifyContent: "center",
//                         mt: 13,
//                         "&:hover": {
//                           background: "#7f42e7",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       Explore < KeyboardArrowRight  sx={{ mt: -0.2}}/>
//                     </Button>
//                 </Box> 
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     height: 300,
//                     // backgroundImage: `url(${ house})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     position: "relative",
//                     background: "#FFFFFF",
//                     // background: "linear-gradient(90deg, #b893f6ff, #7f42e7ff)" 
//                     borderRadius: 4,
//                     justifyContent: "center",
//                     p: { xs: 2, md: 3 },
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                  <Typography variant="h6" textAlign="start" fontWeight="semi-bold" color="#05050B">
//                     <HandshakeOutlined sx={{ fontSize: 28 }} />
//                   </Typography>
//                   <Box mt={2}>   
//                     <Typography
//                       sx={{
//                         fontFamily: "",
//                         fontSize: { xs: "2.2rem", md: "1.6rem" },
//                         fontWeight: 700,
//                         color: "#05050B",
//                         lineHeight: 1.1
//                       }}
//                     >
//                       Companies
//                     </Typography>
//                     <Typography color="#05050B" fontSize={13}>
//                       Find talent worth hiring
//                     </Typography> 
//                   </Box>
//                   <Button
//                     // variant=""
//                     component={Link} to="/company-portal"
//                     sx={{
//                       borderRadius: 5,
//                       textTransform: "none",
//                       fontWeight: 600,
//                       // borderColor: "#e8e8e8ff",
//                       maxWidth: 100,
//                       background: "#FFFFFF",
//                       color: "#7f42e7ff",
//                       justifyContent: "center",
//                       mt: 13,
//                       "&:hover": {
//                         background: "#7f42e7",
//                         color: "#fff",
//                       },
//                     }}
//                   >                  
//                     Explore < KeyboardArrowRight sx={{ mt: -0.2}}/>
//                   </Button>
//                 </Box>
//               </Grid>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Home;









// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Stack,
//   CardMedia,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { signup, prepare, landit } from "../assets";
// import { KeyboardArrowRight, HandshakeOutlined } from "@mui/icons-material";
// import ty from "../assets/ty.jpg";

// const PRIMARY = "#7f42e7";
// const PRIMARY_LIGHT = "#b893f6";
// const BG_PURPLE = "#f5f0fd";

// const Home = () => {
//   return (
//     <Box sx={{ overflowX: "hidden", maxWidth: "100vw" }}>

//       {/* ── HERO ── */}
//       <Box sx={{ backgroundColor: BG_PURPLE, px: { xs: 2, md: 8 }, py: { xs: 5, md: 8 } }}>
//         <Grid container spacing={4} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <Typography
//               sx={{
//                 fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
//                 fontWeight: 800,
//                 lineHeight: 1.3,
//                 color: "#05050B",
//               }}
//             >
//               Master{" "}
//               <Box component="span" sx={{ color: PRIMARY }}>
//                 interviews
//               </Box>{" "}
//               before they matter
//             </Typography>

//             <Typography mt={2} fontSize={14} color="#05050B" sx={{ maxWidth: 480 }}>
//               inTurn uses AI-powered interviews to simulate real-world scenarios,
//               analyzes and optimizes your CV to pass ATS filters, and connects you
//               with experienced professionals for live mock interviews.
//             </Typography>

//             <Stack direction="row" spacing={2} mt={3} flexWrap="wrap" gap={1}>
//               <Button
//                 variant="contained"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   fontWeight: 600,
//                   background: PRIMARY,
//                   "&:hover": { opacity: 0.9, background: PRIMARY },
//                 }}
//               >
//                 Start practicing
//               </Button>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 5,
//                   textTransform: "none",
//                   borderColor: PRIMARY,
//                   color: PRIMARY,
//                   fontWeight: 600,
//                   "&:hover": { background: PRIMARY, color: "#fff" },
//                 }}
//               >
//                 Learn more
//               </Button>
//             </Stack>
//           </Grid>

//           <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
//             <Box
//               sx={{
//                 width: "100%",
//                 maxWidth: 500,
//                 height: 280,
//                 borderRadius: 4,
//                 backgroundImage: `url(${ty})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 overflow: "hidden",
//               }}
//             />
//           </Grid>
          
//         </Grid>
//       </Box>

//       {/* ── THREE TOOLS ── */}
//       <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 5, md: 7 }, background: "#fff", mt: 6 }}>
//         <Stack spacing={1} mb={4} alignItems="center">
//           <Typography variant="h4" fontWeight="bold" color="#05050B" textAlign="center">
//             Three tools that work
//           </Typography>
//           <Typography variant="h6" color="#727272" textAlign="center" fontWeight="regular">
//             Everything you need to prepare
//           </Typography>
//         </Stack>

//         <Grid container spacing={3}>
//           {/* AI Interview – large card */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 background: BG_PURPLE,
//                 borderRadius: 4,
//                 p: { xs: 3, md: 6 },
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 minHeight: 280,
//               }}
//             >
//               <Box>
//                 <Typography fontSize={14} fontWeight="bold" color="#05050B" mb={1}>
//                   First
//                 </Typography>
//                 <Typography
//                   sx={{ fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 700, color: "#05050B", lineHeight: 1.1 }}
//                 >
//                   AI Interview practice
//                 </Typography>
//                 <Typography color="#05050B" fontSize={14} mt={1}>
//                   Run through questions anytime, anywhere. Get instant feedback on your answers.
//                 </Typography>
//               </Box>

//               <Stack direction="row" spacing={1} mt={3} flexWrap="wrap" gap={1}>
//                 <Button
//                   component={Link} to="/ai-practice"
//                   variant="contained"
//                   sx={{
//                     borderRadius: 5, textTransform: "none", fontWeight: 600,
//                     background: PRIMARY, "&:hover": { opacity: 0.9, background: PRIMARY },
//                   }}
//                 >
//                   Start Practicing
//                 </Button>
//                 <Button
//                   component={Link} to="/more-about-ai"
//                   sx={{
//                     borderRadius: 5, textTransform: "none", color: PRIMARY, fontWeight: 600,
//                     "&:hover": { background: PRIMARY, color: "#fff" },
//                   }}
//                 >
//                   Learn more <KeyboardArrowRight />
//                 </Button>
//               </Stack>
//             </Box>
//           </Grid>

//           {/* CV Analysis + Real Mock – two small cards */}
//           <Grid item xs={12} md={6}>
//             <Grid container spacing={3} sx={{ height: "100%" }}>
//               <Grid item xs={12} sm={6}>
//                 <Box
//                   sx={{
//                     background: BG_PURPLE, borderRadius: 4, p: 3,
//                     display: "flex", flexDirection: "column", justifyContent: "space-between",
//                     minHeight: 280,
//                   }}
//                 >
//                   <Box>
//                     <HandshakeOutlined sx={{ fontSize: 28, color: "#05050B" }} />
//                     <Typography
//                       sx={{ fontSize: { xs: "1.5rem", md: "1.5rem" }, fontWeight: 700, color: "#05050B", lineHeight: 1.1, mt: 1 }}
//                     >
//                       CV analysis
//                     </Typography>
//                     <Typography color="#05050B" fontSize={13} mt={1}>
//                       See what works. Improve what doesn't. Pass the ATS on the first go.
//                     </Typography>
//                   </Box>
//                   <Button
//                     component={Link} to="/more-about-cv-analysis"
//                     sx={{
//                       borderRadius: 5, textTransform: "none", fontWeight: 600,
//                       color: PRIMARY, alignSelf: "flex-start", mt: 2,
//                       "&:hover": { background: PRIMARY, color: "#fff" },
//                     }}
//                   >
//                     Explore <KeyboardArrowRight />
//                   </Button>
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box
//                   sx={{
//                     background: BG_PURPLE, borderRadius: 4, p: 3,
//                     display: "flex", flexDirection: "column", justifyContent: "space-between",
//                     minHeight: 280,
//                   }}
//                 >
//                   <Box>
//                     <HandshakeOutlined sx={{ fontSize: 28, color: "#05050B" }} />
//                     <Typography
//                       sx={{ fontSize: { xs: "1.5rem", md: "1.5rem" }, fontWeight: 700, color: "#05050B", lineHeight: 1.1, mt: 1 }}
//                     >
//                       Real mock interviews
//                     </Typography>
//                     <Typography color="#05050B" fontSize={13} mt={1}>
//                       Talk to actual recruiters. Get real experience.
//                     </Typography>
//                   </Box>
//                   <Button
//                     component={Link} to="/more-about-real-professionals"
//                     sx={{
//                       borderRadius: 5, textTransform: "none", fontWeight: 600,
//                       color: PRIMARY, alignSelf: "flex-start", mt: 2,
//                       "&:hover": { background: PRIMARY, color: "#fff" },
//                     }}
//                   >
//                     Explore <KeyboardArrowRight />
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* ── HOW IT WORKS: 01 / 02 / 03 ── */}
//       {[
//         {
//           step: "01 Sign up",
//           label: "Start",
//           heading: "Create your account in seconds",
//           body: "Join inTurn and set up your profile. Tell us about your goals and the roles you're chasing.",
//           cta: { label: "Begin", to: "/login" },
//           image: signup,
//         },
//         {
//           step: "02 Practice hard",
//           label: "Prepare",
//           heading: "Work with AI and real interviews",
//           body: "Use AI to drill common questions. Schedule mock interviews with professionals. Watch your skills sharpen.",
//           cta: { label: "Train", to: "/ai-practice" },
//           image: prepare,
//         },
//         {
//           step: "03 Land it",
//           label: "Succeed",
//           heading: "Walk into interviews with confidence",
//           body: "You've practiced. You've learned. Now you're ready. Get the job.",
//           cta: { label: "Apply", to: "/job-applications" },
//           image: landit,
//         },
//       ].map(({ step, label, heading, body, cta, image }) => (
//         <Box
//           key={step}
//           sx={{
//             backgroundColor: "#FFFFFF",
//             px: { xs: 2, md: 6 },
//             py: { xs: 5, md: 6 },
//             borderTop: "1px solid #cbcbcb",
//           }}
//         >
//           <Typography fontWeight="bold" fontSize={16} color={PRIMARY_LIGHT} mb={1}>
//             {step}
//           </Typography>
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Typography fontSize={14} fontWeight="bold" mb={1}>
//                 {label}
//               </Typography>
//               <Typography
//                 sx={{ fontSize: { xs: "1.8rem", md: "2.8rem" }, fontWeight: 700, lineHeight: 1.1 }}
//               >
//                 {heading}
//               </Typography>
//               <Typography mt={2} fontSize={14} color="#444">
//                 {body}
//               </Typography>
//               <Stack direction="row" spacing={2} mt={3} flexWrap="wrap" gap={1}>
//                 <Button
//                   component={Link} to={cta.to}
//                   variant="contained"
//                   sx={{
//                     borderRadius: 5, textTransform: "none", fontWeight: 600,
//                     background: PRIMARY, "&:hover": { opacity: 0.9, background: PRIMARY },
//                   }}
//                 >
//                   {cta.label}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderRadius: 5, textTransform: "none",
//                     borderColor: PRIMARY, color: PRIMARY, fontWeight: 600,
//                     "&:hover": { background: PRIMARY, color: "#fff" },
//                   }}
//                 >
//                   Learn more <KeyboardArrowRight />
//                 </Button>
//               </Stack>
//             </Grid>

//             <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
//               <CardMedia
//                 component="img"
//                 image={image}
//                 sx={{ width: "100%", maxHeight: 340, objectFit: "cover", borderRadius: 3 }}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       ))}

//       {/* ── BUILT FOR EVERYONE ── */}
//       <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 5, md: 6 }, background: BG_PURPLE }}>
//         <Stack spacing={1} mb={4} alignItems="center">
//           <Typography variant="h6" fontWeight="bold" textAlign="center">Why</Typography>
//           <Typography variant="h4" fontWeight="bold" color="#05050B" textAlign="center">
//             Built for everyone
//           </Typography>
//           <Typography variant="h6" color="#555" textAlign="center" fontWeight="regular">
//             Everyone gets what they need
//           </Typography>
//         </Stack>

//         <Grid container spacing={3}>
//           {/* Students – large */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 background: "#fff", borderRadius: 4, p: { xs: 3, md: 6 },
//                 display: "flex", flexDirection: "column", justifyContent: "space-between",
//                 minHeight: 280,
//               }}
//             >
//               <Box mt={-3}>
//                 <Typography variant="h6" fontWeight="bold" color="#05050B">Students</Typography>
//                 <Typography
//                   sx={{ fontSize: { xs: "1.8rem", md: "2.2 rem" }, fontWeight: 700, color: "#05050B", lineHeight: 1.1, mt: 1 }}
//                 >
//                   Gain real interview experience
//                 </Typography>
//                 <Typography color="#05050B" fontSize={14} mt={1}>
//                   Practice with AI and real professionals. Get feedback that matters. Build confidence.
//                 </Typography>
//               </Box>
//               <Stack direction="row" mt={3}>
//                 <Button
//                   component={Link} to="/login"
//                   variant="contained"
//                   sx={{
//                     borderRadius: 5, textTransform: "none", fontWeight: 600,
//                     background: PRIMARY, color: "#fff",
//                     "&:hover": { opacity: 0.9, background: PRIMARY },
//                   }}
//                 >
//                   Start Now
//                 </Button>
//               </Stack>
//             </Box>
//           </Grid>

//           {/* Professionals + Companies */}
//           <Grid item xs={12} md={6}>
//             <Grid container spacing={3}>
//               {[
//                 {
//                   title: "Professionals",
//                   desc: "Help build talent worth hiring.",
//                   to: "/professional-portal",
//                 },
//                 {
//                   title: "Companies",
//                   desc: "Find talent worth hiring.",
//                   to: "/company-portal",
//                 },
//               ].map(({ title, desc, to }) => (
//                 <Grid item xs={12} sm={6} key={title}>
//                   <Box
//                     sx={{
//                       background: "#fff", borderRadius: 4, p: 3,
//                       display: "flex", flexDirection: "column", justifyContent: "space-between",
//                       minHeight: 280,
//                     }}
//                   >
//                     <Box>
//                       <HandshakeOutlined sx={{ fontSize: 28, color: "#05050B" }} />
//                       <Typography
//                         sx={{ fontSize: "1.4rem", fontWeight: 700, color: "#05050B", lineHeight: 1.1, mt: 1 }}
//                       >
//                         {title}
//                       </Typography>
//                       <Typography color="#05050B" fontSize={13} mt={1}>{desc}</Typography>
//                     </Box>
//                     <Button
//                       component={Link} to={to}
//                       sx={{
//                         borderRadius: 5, textTransform: "none", fontWeight: 600,
//                         color: PRIMARY, alignSelf: "flex-start", mt: 2,
//                         "&:hover": { background: PRIMARY, color: "#fff" },
//                       }}
//                     >
//                       Explore <KeyboardArrowRight />
//                     </Button>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Home;










import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Grid, Stack, Container, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardArrowRight, HandshakeOutlined } from "@mui/icons-material";
import { Brain, FileText, Users, TrendingUp, Briefcase, Building2, CheckCircle2, ArrowRight, Sparkles, Star } from "lucide-react";

// ─── BRAND TOKENS ──────────────────────────────────────────────────────────────
const P = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_LIGHT = "#F0EAFD";
const P_MID = "#B893F6";
const OFF_WHITE = "#FAFAFA";

const PD     = "#5E2EC5";
const PM     = "#B893F6";
const PL     = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#4A4A5A";
const INK3   = "#8A8AA0";
const BORDER = "#E8E3F5";
const OFF    = "#F7F6FC";
const WHITE  = "#FFFFFF";
const GRN    = "#059669";
const GRNL   = "#ECFDF5";
const AMB    = "#D97706";
const AMBL   = "#FFFBEB";
const RED    = "#DC2626";
const REDL   = "#FEF2F2";

// ─── FONT STACKS ──────────────────────────────────────────────────────────────
const FONT_DISPLAY = "'Arial Black', 'Arial Bold', 'Helvetica Neue', sans-serif";
const FONT_BODY = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// ─── KEYFRAME STYLES ──────────────────────────────────────────────────────────
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }

  body { margin: 0; font-family: ${FONT_BODY}; background: #FAFAFA; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);    opacity: 0.6; }
    100% { transform: scale(1.45); opacity: 0;   }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position: 200% center; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .fade-up-1 { animation-delay: 0.1s; }
  .fade-up-2 { animation-delay: 0.2s; }
  .fade-up-3 { animation-delay: 0.3s; }
  .fade-up-4 { animation-delay: 0.4s; }
  .fade-up-5 { animation-delay: 0.5s; }
  .fade-up-6 { animation-delay: 0.6s; }

  .card-hover {
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 48px rgba(127,66,231,0.12);
  }

  .btn-primary {
    background: ${P};
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 14px 32px;
    font-family: ${FONT_BODY};
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .btn-primary:hover {
    background: ${P_DARK};
    transform: translateY(-2px);
  }
  .btn-ghost {
    background: transparent;
    color: ${P};
    border: 1.5px solid ${P};
    border-radius: 100px;
    padding: 13px 28px;
    font-family: ${FONT_BODY};
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
  }
  .btn-ghost:hover {
    background: ${P};
    color: #fff;
    transform: translateY(-2px);
  }
`;

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────
const stats = [
  { value: "12K+", label: "Students trained" },
  { value: "94%", label: "Interview success rate" },
  { value: "850+", label: "Professionals" },
  { value: "4.9★", label: "Average rating" },
];

// ─── TOOLS DATA ───────────────────────────────────────────────────────────────
const tools = [
  {
    tag: "AI-Powered",
    title: "Mock Interview\nSimulator",
    desc: "Adaptive AI that asks real questions, listens to your answers, and scores you in real time. Practice anytime, no booking needed.",
    cta: "Start practicing",
    to: "/ai-practice",
    icon: <Brain size={22} />,
    accent: P,
  },
  {
    tag: "Smart Analysis",
    title: "CV & ATS\nOptimizer",
    desc: "Upload your CV. Our engine scans it against ATS filters, rewrites weak sections, and gives you a readiness score.",
    cta: "Scan my CV",
    to: "/cv-analysis",
    icon: <FileText size={22} />,
    accent: "#00B894",
  },
  {
    tag: "Human Connection",
    title: "Real Mock\nInterviews",
    desc: "Book 1-on-1 sessions with working professionals in your target industry. Get raw, honest feedback that AI can't replicate.",
    cta: "Browse professionals",
    to: "/professionals",
    icon: <Users size={22} />,
    accent: "#E17055",
  },
];

// ─── STEPS ────────────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Create your account",
    desc: "Set up your profile in under two minutes. Tell us your target role, industry, and experience level.",
    label: "Sign up",
  },
  {
    num: "02",
    title: "Practice relentlessly",
    desc: "Run AI sessions daily. Book real professional mock interviews when you're ready to level up.",
    label: "Prepare",
  },
  {
    num: "03",
    title: "Walk in with confidence",
    desc: "You've practiced more than any candidate in the room. Now go show them.",
    label: "Land it",
  },
];

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const reviews = [
  { name: "Thando M.", role: "Software Intern @ Absa", text: "Two mock interviews and I had an offer. The AI feedback was brutally honest — exactly what I needed.", rating: 5 },
  { name: "Aisha K.", role: "Data Analyst @ Vodacom", text: "My CV was being ghosted for months. After the ATS optimizer, I got 3 callbacks in one week.", rating: 5 },
  { name: "James D.", role: "Product Manager @ Takealot", text: "The real professional session changed how I tell my story. Worth every rand.", rating: 5 },
  { name: "Lerato N.", role: "UX Designer @ Discovery", text: "I went from shaking in interviews to actually enjoying them. Wild what practice does.", rating: 5 },
  { name: "Michael O.", role: "Finance Grad @ Nedbank", text: "The ATS scan found 11 issues I never would've caught. Landed a role within 3 weeks.", rating: 5 },
  { name: "Siya P.", role: "Marketing Lead @ FNB", text: "Booked 4 sessions with a recruiter who grilled me hard. Best preparation money I've ever spent.", rating: 5 },
];

// ─── PORTAL CARDS ─────────────────────────────────────────────────────────────
const portals = [
  {
    who: "Students",
    headline: "Practice until it's automatic",
    desc: "AI sessions, CV optimization, and real professionals — all in one place.",
    cta: "Start for free",
    to: "/login",
    highlight: true,
  },
  {
    who: "Professionals",
    headline: "Earn from your expertise",
    desc: "Host mock interviews and mentorship sessions. Top mentors earn R5,000+/month.",
    cta: "Become a mentor",
    to: "/professional-portal",
    highlight: false,
  },
  {
    who: "Companies",
    headline: "Hire talent that's ready",
    desc: "Access pre-trained, interview-ready candidates and post jobs directly.",
    cta: "Post jobs",
    to: "/company-portal",
    highlight: false,
  },
];

// ─── MARQUEE LOGOS ────────────────────────────────────────────────────────────
const companies = ["Absa", "Vodacom", "Nedbank", "Discovery", "Takealot", "FNB", "MTN", "Standard Bank", "Capitec", "Old Mutual"];

// ─────────────────────────────────────────────────────────────────────────────
const Home = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <Box sx={{ overflowX: "hidden", maxWidth: "100vw", background: OFF_WHITE, fontFamily: FONT_BODY }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <Box
          ref={heroRef}
          sx={{
            // background: `linear-gradient(160deg, ${P_LIGHT} 0%, #fff 60%)`,
            background:`linear-gradient(160deg,${PL} 0%,${WHITE} 60%)`,
            pt: { xs: 8, md: 14 },
            pb: { xs: 10, md: 16 },
            px: { xs: 3, md: 8 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative blobs */}
          <Box sx={{
            position: "absolute", top: -80, right: -80, width: 400, height: 400,
            borderRadius: "50%", background: `radial-gradient(circle, ${P}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <Box sx={{
            position: "absolute", bottom: -60, left: "20%", width: 300, height: 300,
            borderRadius: "50%", background: `radial-gradient(circle, ${P_MID}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <Container maxWidth="lg">
            <Stack alignItems="center" textAlign="center" spacing={4}>
              {/* tag */}
              <Box
                className={heroVisible ? "fade-up fade-up-1" : ""}
                sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  background: "#fff", border: `1.5px solid ${BORDER}`,
                  borderRadius: 100, px: 2, py: 0.75,
                  boxShadow: "0 2px 12px rgba(127,66,231,0.08)",
                }}
              >
                <Sparkles size={14} color={P} />
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: P, fontFamily: FONT_BODY }}>
                  AI-powered interview preparation
                </Typography>
              </Box>

              {/* headline */}
              <Box className={heroVisible ? "fade-up fade-up-2" : ""}>
                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: { xs: "2.6rem", sm: "3.5rem", md: "5rem" },
                    fontWeight: 800,
                    lineHeight: 1.05,
                    color: INK,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Master interviews{" "}
                  <Box
                    component="span"
                    sx={{
                      color: P,
                      backgroundImage: `linear-gradient(90deg, ${P}, ${P_MID}, ${P})`,
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "shimmer 3s linear infinite",
                    }}
                  >
                    before
                  </Box>
                  <br />they matter.
                </Typography>
              </Box>

              {/* sub */}
              <Box className={heroVisible ? "fade-up fade-up-3" : ""}>
                <Typography
                  sx={{
                    fontSize: { xs: 16, md: 18 },
                    color: INK2,
                    maxWidth: 560,
                    lineHeight: 1.7,
                    fontWeight: 300,
                    fontFamily: FONT_BODY,
                  }}
                >
                  inTurn combines AI mock interviews, ATS-beating CV analysis, and real professional sessions — so you walk into every interview fully prepared.
                </Typography>
              </Box>

              {/* CTAs */}
              <Stack
                className={heroVisible ? "fade-up fade-up-4" : ""}
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
              >            
                <Typography className="btn-primary" component={Link} to="/mentee" >
                  Start practicing free <ArrowRight size={16} />
                </Typography>
                <Typography className="btn-ghost" component={Link} to="/how-it-works" >
                  Watch how it works
                </Typography>
              </Stack>

              {/* social proof chips */}
              <Stack
                className={heroVisible ? "fade-up fade-up-5" : ""}
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent="center"
              >
                {["No credit card", "Free AI session", "Real professionals"].map((t) => (
                  <Box
                    key={t}
                    sx={{
                      display: "flex", alignItems: "center", gap: 0.5,
                      background: "#fff", border: `1px solid ${BORDER}`,
                      borderRadius: 100, px: 1.5, py: 0.5,
                    }}
                  >
                    <CheckCircle2 size={12} color="#00B894" />
                    <Typography sx={{ fontSize: 12.5, color: INK2, fontFamily: FONT_BODY }}>{t}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
        <Box sx={{ background: INK, py: { xs: 4, md: 5 }, px: { xs: 3, md: 8 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {stats.map((s) => (
                <Grid item xs={6} md={3} key={s.label}>
                  <Stack alignItems="center" spacing={0.5}>
                    <Typography
                      sx={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: { xs: "1.8rem", md: "2.4rem" },
                        fontWeight: 800,
                        color: "#fff",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.value}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textAlign: "center", fontFamily: FONT_BODY }}>
                      {s.label}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
        <Box sx={{ py: 2.5, background: P_LIGHT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex", gap: 5,
              animation: "marquee 18s linear infinite",
              width: "max-content",
            }}
          >
            {[...companies, ...companies].map((c, i) => (
              <Typography key={i} sx={{ fontSize: 13, fontWeight: 500, color: INK2, whiteSpace: "nowrap", opacity: 0.6, fontFamily: FONT_BODY }}>
                {c}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* ── THREE TOOLS ───────────────────────────────────────────────────── */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: "#fff" }}>
          <Container maxWidth="lg">
            <Stack spacing={2} mb={7} alignItems={{ xs: "center", md: "flex-start" }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT_BODY }}>
                The toolkit
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 800,
                  color: INK,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Three tools that close the gap.
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {tools.map((tool, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box
                    className="card-hover"
                    sx={{
                      background: i === 0 ? INK : "#fff",
                      border: `1.5px solid ${i === 0 ? "transparent" : BORDER}`,
                      borderRadius: 4,
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: 320,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {i === 0 && (
                      <Box sx={{
                        position: "absolute", top: -40, right: -40,
                        width: 200, height: 200, borderRadius: "50%",
                        background: `radial-gradient(circle, ${P}40 0%, transparent 70%)`,
                        pointerEvents: "none",
                      }} />
                    )}
                    <Box>
                      {/* icon + tag */}
                      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
                        <Box
                          sx={{
                            width: 44, height: 44, borderRadius: 2,
                            background: `${tool.accent}20`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: tool.accent,
                          }}
                        >
                          {tool.icon}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12, fontWeight: 600, color: i === 0 ? "rgba(255,255,255,0.5)" : INK2,
                            textTransform: "uppercase", letterSpacing: "0.08em",
                            fontFamily: FONT_BODY,
                          }}
                        >
                          {tool.tag}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: "1.55rem",
                          fontWeight: 700,
                          color: i === 0 ? "#fff" : INK,
                          lineHeight: 1.2,
                          mb: 1.5,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {tool.title}
                      </Typography>

                      <Typography sx={{ fontSize: 14.5, color: i === 0 ? "rgba(255,255,255,0.6)" : INK2, lineHeight: 1.7, fontFamily: FONT_BODY }}>
                        {tool.desc}
                      </Typography>
                    </Box>

                    <Box mt={3}>
                      <a
                        href={tool.to}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 14,
                          fontWeight: 500,
                          color: i === 0 ? "#fff" : P,
                          textDecoration: "none",
                          fontFamily: FONT_BODY,
                        }}
                      >
                        {tool.cta} <ArrowRight size={14} />
                      </a>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: P_LIGHT }}>
          <Container maxWidth="lg">
            <Stack spacing={1} mb={8} alignItems="center" textAlign="center">
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT_BODY }}>
                Process
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 800,
                  color: INK,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                From zero to hired — in three steps.
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {steps.map((step, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box
                    className="card-hover"
                    sx={{
                      background: "#fff",
                      border: `1.5px solid ${BORDER}`,
                      borderRadius: 4,
                      p: 4,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: "5rem",
                        fontWeight: 800,
                        color: `${P}12`,
                        lineHeight: 1,
                        position: "absolute",
                        top: -8,
                        right: 16,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.num}
                    </Typography>
                    <Box
                      sx={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: P, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700, mb: 3,
                        fontFamily: FONT_DISPLAY,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.08em", mb: 1, fontFamily: FONT_BODY }}>
                      {step.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: INK,
                        mb: 1.5,
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.7, fontFamily: FONT_BODY }}>
                      {step.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: "#fff" }}>
          <Container maxWidth="lg">
            <Stack spacing={1} mb={7} alignItems="center" textAlign="center">
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT_BODY }}>
                Real results
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  fontWeight: 800,
                  color: INK,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                They practiced. They got hired.
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {reviews.map((r, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Box
                    className="card-hover"
                    sx={{
                      background: "#fff",
                      border: `1.5px solid ${BORDER}`,
                      borderRadius: 3,
                      p: 3,
                      height: "100%",
                    }}
                  >
                    <Stack direction="row" spacing={0.3} mb={2}>
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={14} fill={P} color={P} />
                      ))}
                    </Stack>
                    <Typography sx={{ fontSize: 14.5, color: INK, lineHeight: 1.7, mb: 2.5, fontStyle: "italic", fontFamily: FONT_BODY }}>
                      "{r.text}"
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 38, height: 38, borderRadius: "50%",
                          background: P_LIGHT, color: P,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: FONT_DISPLAY,
                          fontWeight: 700, fontSize: 14,
                        }}
                      >
                        {r.name[0]}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: INK, fontFamily: FONT_BODY }}>{r.name}</Typography>
                        <Typography sx={{ fontSize: 12, color: INK2, fontFamily: FONT_BODY }}>{r.role}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── WHO IT'S FOR ──────────────────────────────────────────────────── */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: P_LIGHT }}>
          <Container maxWidth="lg">
            <Stack spacing={1} mb={7} alignItems="center" textAlign="center">
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT_BODY }}>
                Built for everyone
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  fontWeight: 800,
                  color: INK,
                  letterSpacing: "-0.02em",
                }}
              >
                Which path is yours?
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {portals.map((portal, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box
                    className="card-hover"
                    sx={{
                      background: portal.highlight ? INK : "#fff",
                      border: `1.5px solid ${portal.highlight ? "transparent" : BORDER}`,
                      borderRadius: 4,
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: 280,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 12, fontWeight: 600,
                          color: portal.highlight ? P_MID : P,
                          textTransform: "uppercase", letterSpacing: "0.08em", mb: 1.5,
                          fontFamily: FONT_BODY,
                        }}
                      >
                        {portal.who}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: portal.highlight ? "#fff" : INK,
                          lineHeight: 1.25,
                          mb: 1.5,
                        }}
                      >
                        {portal.headline}
                      </Typography>
                      <Typography sx={{ fontSize: 14.5, color: portal.highlight ? "rgba(255,255,255,0.55)" : INK2, lineHeight: 1.7, fontFamily: FONT_BODY }}>
                        {portal.desc}
                      </Typography>
                    </Box>
                    <Box mt={4}>
                      <a
                        href={portal.to}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 24px",
                          borderRadius: 100,
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: FONT_BODY,
                          textDecoration: "none",
                          background: portal.highlight ? P : "transparent",
                          color: portal.highlight ? "#fff" : P,
                          border: portal.highlight ? "none" : `1.5px solid ${P}`,
                          transition: "all 0.2s",
                        }}
                      >
                        {portal.cta} <ArrowRight size={14} />
                      </a>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <Box
          sx={{
            py: { xs: 10, md: 16 },
            px: { xs: 3, md: 8 },
            background: INK,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: `radial-gradient(circle, ${P}25 0%, transparent 65%)`,
            pointerEvents: "none",
          }} />
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              sx={{
                fontFamily: FONT_DISPLAY,
                fontSize: { xs: "2.2rem", md: "3.5rem" },
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                mb: 2,
              }}
            >
              Your next interview is your best one.
            </Typography>
            <Typography sx={{ fontSize: 17, color: "rgba(255,255,255,0.5)", mb: 5, lineHeight: 1.7, fontFamily: FONT_BODY }}>
              Join 12,000+ students who stopped winging it.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              
              <Typography className="btn-primary" component={Link} to="/mentee" >
                Get started — it's free <ArrowRight size={16} />
              </Typography>
              <Typography component={Link} to="/ai-practice"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "14px 28px", borderRadius: 100, fontSize: 15,
                  fontWeight: 500, fontFamily: FONT_BODY,
                  textDecoration: "none", color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  transition: "all 0.2s",
                }}
              >
                Try AI interview first
              </Typography>            
            </Stack>
          </Container>
        </Box>

      </Box>
    </>
  );
};

export default Home;








// import React from "react";
// import { Box, Container, Typography, Stack, Grid, Card, Button } from "@mui/material";
// import { Toolbar } from "@mui/material";
// import { Link } from "react-router-dom";
// import { AppBar } from "@mui/material";
// import { CardContent } from "@mui/material";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import ShieldIcon from "@mui/icons-material/Shield";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

// const Home: React.FC = () => {
//   return (
//     <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
      
//       {/* HEADER */}
//       <AppBar position="sticky" sx={{ bgcolor: "background.paper", backgroundImage: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
//         <Container maxWidth="lg">
//           <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
//             <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px" }}>
//               finTax<Box component="span" sx={{ color: "secondary.main" }}>.</Box>
//             </Typography>
//             <Stack direction="row" spacing={3} alignItems="center">
//               <Link href="#features" color="text.secondary" underline="none" sx={{ "&:hover": { color: "primary.main" } }}>Features</Link>
//               <Link href="#trust" color="text.secondary" underline="none" sx={{ "&:hover": { color: "primary.main" } }}>Security</Link>
//               <Button variant="contained" color="primary" sx={{ boxShadow: "0px 0px 15px rgba(0, 240, 255, 0.3)" }}>
//                 Launch App
//               </Button>
//             </Stack>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* BODY / HERO SECTION */}
//       <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 }, pb: 8 }}>
//         <Grid container spacing={6} alignItems="center">
//           <Grid item xs={12} md={7}>
//             <Box sx={{ inlineSize: "fit-content", px: 2, py: 0.5, bgcolor: "rgba(112, 0, 255, 0.1)", border: "1px solid #7000FF", borderRadius: "20px", mb: 3 }}>
//               <Typography variant="caption" sx={{ color: "secondary.main", fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
//                 <AutoAwesomeIcon fontSize="small" /> Next-Gen SARS Automation
//               </Typography>
//             </Box>
//             <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, mb: 3 }}>
//               The Future of South African <Box component="span" sx={{ color: "primary.main" }}>Tax Automation</Box>
//             </Typography>
//             <Typography variant="h6" sx={{ color: "text.secondary", mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
//               Connect your bank feeds, upload your IRP5, and let our secure, AI-driven core optimize your eFiling submission automatically. Fully compliant with current 2026 SARS frameworks.
//             </Typography>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Button variant="contained" size="large" color="primary" sx={{ px: 4, py: 1.5 }}>
//                 Automate Your Taxes Now
//               </Button>
//               <Button variant="outlined" size="large" sx={{ borderColor: "rgba(255,255,255,0.2)", color: "#FFF", "&:hover": { borderColor: "primary.main" } }}>
//                 See How It Works
//               </Button>
//             </Stack>
//           </Grid>

//           {/* FUTURISTIC VISUAL ELEMENT */}
//           <Grid item xs={12} md={5}>
//             <Box sx={{
//               position: "relative",
//               p: 4,
//               borderRadius: "24px",
//               background: "linear-gradient(135deg, #12192C 0%, #0A0F1D 100%)",
//               border: "1px solid rgba(0, 240, 255, 0.15)",
//               boxShadow: "0px 20px 40px rgba(0,0,0,0.5), inset 0px 0px 30px rgba(0, 240, 255, 0.05)"
//             }}>
//               <Typography sx={{ fontFamily: "monospace", color: "primary.main", mb: 1 }}>&gt; initializing_sars_sync...</Typography>
//               <Typography sx={{ fontFamily: "monospace", color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Calculating Section 11(F) deductions...</Typography>
//               <Box sx={{ height: "4px", width: "100%", bgcolor: "rgba(255,255,255,0.05)", borderRadius: "2px", mb: 3, overflow: "hidden" }}>
//                 <Box sx={{ height: "100%", width: "78%", bgcolor: "primary.main", boxShadow: "0 0 8px #00F0FF" }} />
//               </Box>
//               <Stack spacing={2}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, bgcolor: "rgba(0,0,0,0.2)", borderRadius: "8px" }}>
//                   <Typography variant="body2">Estimated Refund</Typography>
//                   <Typography variant="body2" sx={{ color: "success.main", fontWeight: 700 }}>R 14,850.00</Typography>
//                 </Box>
//               </Stack>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* TRUST / VALUES SECTION */}
//         <Box id="trust" sx={{ mt: { xs: 10, md: 16 } }}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4}>
//               <Card sx={{ bgcolor: "background.paper", backgroundImage: "none", border: "1px solid rgba(255,255,255,0.03)" }}>
//                 <CardContent sx={{ p: 3 }}>
//                   <ShieldIcon sx={{ color: "primary.main", fontSize: 40, mb: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1 }}>Bank-Grade Security</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     End-to-end encryption keeping your financial identities completely anonymous and secure under POPIA standards.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Card sx={{ bgcolor: "background.paper", backgroundImage: "none", border: "1px solid rgba(255,255,255,0.03)" }}>
//                 <CardContent sx={{ p: 3 }}>
//                   <AccountBalanceIcon sx={{ color: "secondary.main", fontSize: 40, mb: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1 }}>SARS Compliant Core</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Our engines continuously sync with updated South African Revenue Service structural regulations for flawless calculations.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Card sx={{ bgcolor: "background.paper", backgroundImage: "none", border: "1px solid rgba(255,255,255,0.03)" }}>
//                 <CardContent sx={{ p: 3 }}>
//                   <AutoAwesomeIcon sx={{ color: "success.main", fontSize: 40, mb: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1 }}>Smart Optimization</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Intelligent engine sweeps maximize medical aid credits, travel logs, and retirement annuity deductions seamlessly.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>

//       {/* FOOTER */}
//       <Box component="footer" sx={{ bgcolor: "background.paper", py: 6, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4} justifyContent="space-between">
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main", mb: 2 }}>finTax.</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Autonomous tax engineering built for modern South African professionals and businesses.
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={4} textAlign={{ xs: "left", md: "right" }}>
//               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                 Authorized Financial Systems Provider Context
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 &copy; 2026 finTax SA. All rights reserved. Registered POPIA Compliant Operator.
//               </Typography>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//     </Box>
//   );
// };

// export default Home;