import { Box, Container } from "@mui/material";
import Heading from "../../components/Heading";

import Icons from "../../components/Icons";

import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaReact,
  FaPhp,
  FaLaravel,
  FaWordpress,
  FaFigma ,
} from "react-icons/fa";

import { IoLogoJavascript } from "react-icons/io5";
import { RiTailwindCssFill , RiNextjsFill  } from "react-icons/ri";
import {
  SiMui,
  SiPostman,
  SiMariadb,
  SiFlutter,
  SiMysql,
  SiTypescript ,
  SiAdobephotoshop  ,
  SiAdobeillustrator   ,
  SiAdobepremierepro    ,
  SiDavinciresolve     ,
} from "react-icons/si";

const group1 = [
  { icon: <FaHtml5 /> },
  { icon: <FaCss3Alt /> },
  { icon: <FaBootstrap /> },
  { icon: <RiTailwindCssFill /> },
  { icon: <IoLogoJavascript /> },
  { icon: <FaReact /> },
  { icon: <SiMui /> },
  { icon: <FaWordpress /> },
];

const group2 = [
  { icon: <FaPhp /> },
  { icon: <FaLaravel /> },
  { icon: <SiPostman /> },
  { icon: <SiMysql /> },
  { icon: <SiMariadb /> },
  { icon: <SiFlutter /> },
  { icon: <SiTypescript  /> },
  { icon: <RiNextjsFill   /> },
];

const group3 = [{ icon: <SiAdobephotoshop  /> }
  , { icon: <SiAdobeillustrator  /> },
   { icon: <SiAdobepremierepro   /> },
   { icon: <SiDavinciresolve    /> },
   { icon: <FaFigma  /> },
];
const Skills = () => {
  return (
    <main>
      <Box py={5}>
        <Container maxWidth="xl">
          <Heading title="My Skills" subTitle="What I know" />
          <Box
            mb={5}
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Icons links={group1} animation={{ scale: [1, 1.3, 1] }} />
            <Heading title="In Progress" subTitle="Basic understanding of" />
            <Icons links={group2} animation={{ rotate: [0, 10, -10, 0] }} />
            <Heading title="Other Skills" subTitle="Creative tools I use" />
            <Icons links={group3} animation={{ opacity: [1, 0.5, 1] }} />
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default Skills;
