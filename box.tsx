      {/* HERO / BANNER */}
      {/* <Box sx={{  backgroundColor: "#f5f0fdff", px: { xs: 2, md: 1 }, py: 4}}>
        <Grid
          container
          sx={{
            // border: "2px solid #FFFFFF",
            borderRadius: 4,
            overflow: "hidden",
            width: "100%",
            height: {
            lg: "65vh",
            }
          }}
        >
          <Grid
            item xs={12} md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 2, md: 4 },
              height: "100%",
              
            }}
          >
            <Box>
              
                <Typography
                  // key={index}
                  sx={{
                    fontFamily: "",
                    fontSize: { xs: "2.2rem", md: "4.1rem" },
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#05050B"
                  }}
                >
                 
                  Master <Typography sx={{
                    fontFamily: "",
                    fontSize: { xs: "2.2rem", md: "3.5rem" },
                    fontWeight: 700,
                    color: "#b893f6ff",
                    // background: "linear-gradient(90deg, #6366f1, #d946ef)",
                   
                  }}>interviews</Typography> before they matter

                </Typography>
              
              <Typography sx={{ mt: 2, fontSize: 14, color: "#05050B"}} >
                
                
                Inturn uses AI for AI-powered interviews to simulate real-world
                scenarios, analyzes and optimize your CV to pass Applicant Tracking Systems (ATS).
                Step into live mock interviews with experienced
                professionals in your field — and get actionable feedback that prepares
                you for real opportunities.                            
              </Typography>

            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "#7f42e7ff",
                  color: "#FFFFFF",
                  "&:hover": {
                    background: "#b187faff", color: "#FFFFFF"
                  },
                }}
              >
                Start practicing
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  borderColor: "#7f42e7ff",
                  color: "#7f42e7ff",
                  fontWeight: 600,
                  "&:hover": {
                    background: "#b893f6ff", color: "#FFFFFF", borderColor: "#b893f6ff",
                  },
                }}
                
              >
                Learn more
              </Button>
            </Stack>
            </Box>
          </Grid>
          <Grid
            item xs={12} md={6}
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 2, md: 4 },
              height: "100%",
              display:  { xs: "none", md: "flex" },
              
            }}
          >
            <Box sx={{ 
                // backgroundClip: `url(${test})`,
                borderRadius: 5,
                backgroundImage: `url(${ty})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden", 
                
              }}
            >
              
                <Typography
                  // key={index}
                  sx={{
                    fontFamily: "",
                    fontSize: { xs: "2.2rem", md: "4.1rem" },
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#05050B"
                  }}
                >
                  
                  Master <Typography sx={{
                    fontFamily: "",
                    fontSize: { xs: "2.2rem", md: "3.5rem" },
                    fontWeight: 700,
                    color: "#b893f6ff"
                   
                  }}>interviews</Typography> before they matter

                </Typography>
              
              <Typography sx={{ mt: 2, fontSize: 14, color: "#05050B"}} >
                
                
                Inturn uses AI for AI-powered interviews to simulate real-world
                scenarios, analyzes and optimize your CV to pass Applicant Tracking Systems (ATS).
                Step into live mock interviews with experienced
                professionals in your field — and get actionable feedback that prepares
                you for real opportunities.                            
              </Typography>

            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "#7f42e7ff",
                  color: "#FFFFFF",
                  "&:hover": {
                    background: "#b187faff", color: "#FFFFFF"
                  },
                }}
              >
                Start practicing
              </Button>

              <Button
                variant="outlined"
                sx={{

                  borderRadius: 5,
                  textTransform: "none",
                  borderColor: "#b893f6ff",
                  color: "#b893f6ff",
                  fontWeight: 500,
                  "&:hover": {
                    background: "#b893f6ff", color: "#FFFFFF"
                  },
                }}
              >
                Learn more
              </Button>
            </Stack>
            </Box>
          </Grid>

          
        </Grid>
      </Box> */}
      <Box 
        sx={{
          backgroundColor: "#f5f0fd",
          px: { xs: 2, md: 4 },
          py: 4,
          borderRadius: 4,
        }}
      >
        <Grid container>
          {/* LEFT CONTENT */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 2, md: 4 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#05050B",
              }}
            >
              Master{" "}
              <Box
                component="span"
                sx={{
                  color: "#7f42e7",
                }}
              >
                interviews
              </Box>{" "}
              before they matter
            </Typography>

            <Typography mt={2} fontSize={14} color="#05050B">
              Inturn uses AI for AI-powered interviews to simulate real-world
              scenarios, analyzes and optimize your CV to pass Applicant Tracking Systems (ATS).
              Step into live mock interviews with experienced
              professionals in your field — and get actionable feedback that prepares
              you for real opportunities.
            </Typography>

            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "#7f42e7",
                  color: "#fff",
                  "&:hover": {
                    opacity: 0.9,
                    background: "#7f42e7",
                  },
                }}
              >
                Start practicing
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  borderColor: "#7f42e7",
                  color: "#7f42e7",
                  fontWeight: 600,
                  "&:hover": {
                    background: "#7f42e7",
                    color: "#fff",
                  },
                }}
              >
                Learn more
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT VISUAL PLACEHOLDER */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 250,
                borderRadius: 4,
                // background: `linear-gradient(135deg, #6366f1, #d946ef, #ffffff)`,
                // opacity: 0.9,
                backgroundImage: `url(${ty})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden", 
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box       
        sx={{
          backgroundColor: "#eef2ff",
          px: { xs: 2, md: 4 },
          py: 4,
          borderRadius: 4,
        }}
      >
        <Grid container>
          {/* LEFT CONTENT */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 2, md: 4 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#05050B",
              }}
            >
              Master{" "}
              <Box
                component="span"
                sx={{
                  color: "#6366f1",
                }}
              >
                interviews
              </Box>{" "}
              before they matter
            </Typography>

            <Typography mt={2} fontSize={14} color="#05050B">
              Inturn uses AI for AI-powered interviews to simulate real-world
              scenarios, analyzes and optimize your CV to pass Applicant Tracking Systems (ATS).
              Step into live mock interviews with experienced
              professionals in your field — and get actionable feedback that prepares
              you for real opportunities.
            </Typography>

            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "#6366f1",
                  color: "#fff",
                  "&:hover": {
                    opacity: 0.9,
                    background: "#6366f1",
                  },
                }}
              >
                Start practicing
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  borderColor: "#6366f1",
                  color: "#6366f1",
                  fontWeight: 600,
                  "&:hover": {
                    background: "#6366f1",
                    color: "#fff",
                  },
                }}
              >
                Learn more
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT VISUAL PLACEHOLDER */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 250,
                borderRadius: 4,
                // background: `linear-gradient(135deg, #6366f1, #d946ef, #ffffff)`,
                // opacity: 0.9,
                backgroundImage: `url(${ty})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden", 
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box       
        sx={{
          backgroundColor: "#fdf2fb",
          px: { xs: 2, md: 4 },
          py: 4,
          borderRadius: 4,
        }}
      >
        <Grid container>
          {/* LEFT CONTENT */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 2, md: 4 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#05050B",
              }}
            >
              Master{" "}
              <Box
                component="span"
                sx={{
                  color: "#d946ef",
                }}
              >
                interviews
              </Box>{" "}
              before they matter
            </Typography>

            <Typography mt={2} fontSize={14} color="#05050B">
              Inturn uses AI for AI-powered interviews to simulate real-world
              scenarios, analyzes and optimize your CV to pass Applicant Tracking Systems (ATS).
              Step into live mock interviews with experienced
              professionals in your field — and get actionable feedback that prepares
              you for real opportunities.
            </Typography>

            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "#d946ef",
                  color: "#fff",
                  "&:hover": {
                    opacity: 0.9,
                    background: "#d946ef",
                  },
                }}
              >
                Start practicing
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  borderColor: "#d946ef",
                  color: "#d946ef",
                  fontWeight: 600,
                  "&:hover": {
                    background: "#d946ef",
                    color: "#fff",
                  },
                }}
              >
                Learn more
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT VISUAL PLACEHOLDER */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 250,
                borderRadius: 4,
                // background: `linear-gradient(135deg, #6366f1, #d946ef, #ffffff)`,
                // opacity: 0.9,
                backgroundImage: `url(${ty})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden", 
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* <Stack spacing={6}>
      {variants.map((variant, i) => (
        <Box
          key={i}
          sx={{
            backgroundColor: variant.bg,
            px: { xs: 2, md: 4 },
            py: 6,
            borderRadius: 4,
          }}
        >
          <Typography mb={2} fontWeight={600}>
            {variant.title}
          </Typography>

          <Grid container>
            
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 2, md: 4 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "2rem", md: "3.5rem" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "#05050B",
                }}
              >
                Master{" "}
                <Box
                  component="span"
                  sx={{
                    color: variant.accent,
                  }}
                >
                  interviews
                </Box>{" "}
                before they matter
              </Typography>

              <Typography mt={2} fontSize={14} color="#05050B">
                Practice with AI, optimize your CV for ATS, and get real feedback
                from professionals to prepare for real opportunities.
              </Typography>

              <Stack direction="row" spacing={2} mt={3}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    textTransform: "none",
                    fontWeight: 600,
                    background: variant.accent,
                    color: "#fff",
                    "&:hover": {
                      opacity: 0.9,
                      background: variant.accent,
                    },
                  }}
                >
                  Start practicing
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 5,
                    textTransform: "none",
                    borderColor: variant.accent,
                    color: variant.accent,
                    fontWeight: 600,
                    "&:hover": {
                      background: variant.accent,
                      color: "#fff",
                    },
                  }}
                >
                  Learn more
                </Button>
              </Stack>
            </Grid>

            
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 250,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${variant.accent}, #ffffff)`,
                  opacity: 0.3,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      </Stack> */}