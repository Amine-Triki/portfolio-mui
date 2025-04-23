import { Box } from '@mui/material';
import { motion, } from 'framer-motion';
import React from 'react';

const MotionSpan = motion.span;

const iconStyle = {
  fontSize: 80,
  /* color: "#1976d2", */
  "&:hover": {
    color: "secondary.main",
    cursor: "pointer",
  },
};
const Icons = ({ links = [], animation = { scale: [1, 1.3, 1] } }) => {
  return (
    <Box sx={{ display: "flex", gap: 6 ,   justifyContent: "center",  alignItems: "center", flexWrap:"wrap"}}>
      {links.map((item, index) => (
        <MotionSpan
          key={index}
          style={{ display: "inline-block" }}
          animate={animation}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {React.cloneElement(item.icon, { style: iconStyle })}
        </MotionSpan>
      ))}
    </Box>
  );
};

export default Icons