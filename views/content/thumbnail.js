import { Button, Card, CardContent, CardMedia, Grow, Typography } from "@mui/material";
import { useState } from "react";
import { ethers, utils } from "ethers";

const ContentThumbnail = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (content.pdfPath) window.open(content.pdfPath)
  }

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card width='100%'>
        <CardMedia
          sx={{
            backgroundColor: '#f0f0f0',
            width: '100%',
            aspectRatio: '16/9',
            backgroundSize: 'contain'
          }}
          image={content.img_path}
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
        <CardContent
          sx={{
            margin: 1,
            padding: '0 !important',
            aspectRatio: '7/1'
          }}>
          {content.title}
          <Typography noWrap={true} align="right" variant="h5">
            {(Number(content.fee)/ Number('1000000000000000000')).toFixed(2)}  KLAY
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            margin: 1,
            padding: '0 !important',
          }}>
          <Button fullWidth variant='outlined'>
            Purchase
          </Button>
        </CardContent>
      </Card >
    </div>
  )
}

export default ContentThumbnail;