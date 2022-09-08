import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const Spacing = ({ size = 1 }: {size: number}) => {
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      mb: 1,
    }}
    >
      <Typography variant="subtext" sx={{ minWidth: 28 }}>
        {theme.spacing(size)}
      </Typography>

      <Box
        sx={{
          height: theme.spacing(size),
          backgroundColor: '#BFD1FF',
          flex: 1,
          ml: 5,
        }}
      />
    </Box>
  );
};

export default Spacing;
