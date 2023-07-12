import { Card, CardContent, CardMedia, Grow, Slide, Typography } from "@mui/material";
import { useState } from "react";

const ContentThumbnail = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (content.pdfPath) window.open(content.pdfPath)
  }

  return (
    <div onClick={handleClick} style={{ cursor: content.pdfPath ? 'pointer' : 'default' }}>
      <Card sx={{ height: 250 }}>
        <CardMedia
          sx={{
            backgroundColor: '#f0f0f0',
            height: 180,
            width: 'auto'
          }}
          image={content.imgPath}
          onMouseEnter={() => { setIsHovered(true) }}
          onMouseLeave={() => { setIsHovered(false) }}
        >
          <Grow height="100%" direction="up" in={isHovered}>
            <CardContent sx={{
              bottom: 0,
              backgroundColor: '#f8f8f8',
              opacity: .8,
              width: '100%',
              height: '100%',
              padding: 0,
              overflowWrap: 'break-word',
              ":last-child": {
                paddingBottom: 0
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >
              <Typography textAlign="center" padding={2}>
                {content.description}
              </Typography>
            </CardContent>
          </Grow>
        </CardMedia>
        <CardContent>
          {content.title}
          <Typography noWrap={true} align="right" variant="h5">
            price
          </Typography>
        </CardContent>
      </Card >
    </div>
  )
}

export default ContentThumbnail;