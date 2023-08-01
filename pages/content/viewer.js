import { fakeContent } from "@/static/fakeDB";
import { Card, CardContent, CardHeader, CardMedia, Typography, useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const Viewer = () => {
  const theme = useTheme();
  const paragraphs = fakeContent.data.split('\n').filter(p => p.length > 0)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Card sx={{
        width: useMediaQuery(theme.breakpoints.down('sm')) ? '100%' : '50vw',
        maxWidth: '640px',
        minWidth: useMediaQuery(theme.breakpoints.down('sm')) ? '' : '480px',
      }}>
        <CardHeader title={fakeContent.title} subheader={fakeContent.author} />
        <CardMedia
          component="img"
          image={fakeContent.img}
          width='100%' />

        <CardContent>
          {
            paragraphs.map((p, idx) => (
              <div key={idx}>
                < Typography >
                  {p}
                </Typography>
                <br />
              </div>
            ))
          }
        </CardContent>
      </Card >
    </div>
  )
}

export default Viewer;