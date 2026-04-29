import { useState, useEffect } from "react";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

import AmineTrikiImg from "../../assets/amine triki.webp";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import React from "react";

const MotionAnchor = motion.a;

const iconStyle = {
  fontSize: 40,
  color: "primary.main",
  "&:hover": {
    color: "secondary.main",
    cursor: "pointer",
  },
};

const socialLinks = [
  { icon: <GitHubIcon />, url: "https://github.com/Amine-Triki" },
  {
    icon: <LinkedInIcon />,
    url: "https://www.linkedin.com/in/amine-triki-tn/",
  },
  { icon: <FacebookIcon />, url: "https://www.facebook.com/amine.triki.1998" },
  { icon: <YouTubeIcon />, url: "https://www.youtube.com/@aminetrikitv" },
  { icon: <XIcon />, url: "https://x.com/Mr_Amine_Triki" },
  { icon: <InstagramIcon />, url: "https://www.instagram.com/mr_amine_triki/" },
];

const Home = () => {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Amine-Triki/projects-data/main/cv.json",
    )
      .then((res) => res.json())
      .then((data) => setCvData(data));
  }, []);

  const downloadButtonSx = {
    my: 2,
    textTransform: "none",
    background: "#cddc39",
    borderRadius: 10,
    px: 2,
    py: 1,
    color: "primary.main",

    "&:hover": {
      background: "#dce775",
      borderColor: "secondary.main",
      textDecoration: "none",
    },
  };

  const previewButtonSx = {
    my: 2,
    textTransform: "none",
    background: "#1976d2",
    borderRadius: 10,
    px: 2,
    py: 1,
    color: "#fff",

    "&:hover": {
      background: "#1565c0",
      borderColor: "secondary.main",
      textDecoration: "none",
    },
  };

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 5,
          marginTop: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: {
              xs: 300,
              sm: 350,
              md: 400,
              lg: 430,
              xl: 475,
            },
          }}
        >
          <Box>
            <Typography variant="body1">Hello , I am</Typography>
            <Typography variant="h1"> Amine triki</Typography>
            <Typography variant="h2">
              I am Full Stack developer
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                maxWidth: 620,
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                  md: "1.05rem",
                },
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              Based in Tunisia, I’m a Full-Stack Developer and creative content
              creator. I turn ideas into websites that are fast, modern, and
              very easy to use — helping businesses grow online.<br/><span style={{ color: "#949494" }}> Whether you
              need a custom web application or a WordPress site, I focus on
              clean design and ensure everything works perfectly on phones,
              tablets, and computers (Responsive Design). Beyond coding, I share
              my development journey and insights on YouTube to help others
              learn.</span>
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                component="a"
                href={cvData?.cv?.en?.download || "#"}
                target="_blank"
                rel="noopener noreferrer"
                sx={downloadButtonSx}
              >
                Download Resume
              </Button>
              <Button
                variant="contained"
                component="a"
                href={cvData?.cv?.en?.preview || "#"}
                target="_blank"
                rel="noopener noreferrer"
                sx={previewButtonSx}
              >
                Preview Resume
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {socialLinks.map((item, index) => (
              <MotionAnchor
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {React.cloneElement(item.icon, { sx: iconStyle })}
              </MotionAnchor>
            ))}
          </Box>
        </Box>
        <Box
          component="img"
          src={AmineTrikiImg}
          alt="Amine Triki image"
          sx={{
            width: {
              xs: 300,
              sm: "350px",
              md: "400px",
              lg: "430px",
              xl: "475px",
            },
            height: "auto",
          }}
        />
      </Box>
    </main>
  );
};

export default Home;
