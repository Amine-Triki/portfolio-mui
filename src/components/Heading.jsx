import {Box , Typography} from "@mui/material";

const heading = ({title , subTitle}) => {
  return (
    <Box textAlign="center" my={8}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {subTitle}
      </Typography>
    </Box>
  );
};

export default heading;
