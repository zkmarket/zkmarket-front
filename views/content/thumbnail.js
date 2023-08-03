import { Button, Card, CardContent, CardMedia, Grow, Typography } from "@mui/material";
import { useState } from "react";
import { ethers, utils } from "ethers";

import _ from 'lodash'
import Viewer from "@/pages/content/viewer";
import { useRouter } from 'next/router'
import { getData } from "@/utils/content/api";


const ContentThumbnail = ({ content, buttonText='Purchase', pubKey=null}) => {

  const router = useRouter()
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
          <Button 
            fullWidth 
            variant='outlined'
            onClick = {async () => {
              if(buttonText === 'Purchase') { purchase(content) }
              else if (buttonText === 'View' && pubKey) { 
                console.log(content)
                View(content, router, pubKey) 
              }
            }}
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card >
    </div>
  )
}


// GenTrade     : '/genTrade/:addrDel/:addrPeer/:pkEncPeer/:hK/:feeDel/:feePeer',
const purchase = async (content) => {
  console.log(content, typeof(content))
  const feeDel  = (Number(content.fee) * 0.1).toString(16)
  const feePeer = (Number(content.fee) * 0.9).toString(16)

  console.log('zkmarket://genTrade/' 
  + _.get(content, 'addrDel') + '/' 
  + _.get(content, 'addrPeer') + '/' 
  + _.get(content, 'pkEnc')  + '/' 
  + _.get(content, 'hK')     + '/'
  + feeDel                   + '/'
  + feePeer)

  window.location.href = 'zkmarket://genTrade/' 
    + _.get(content, 'addrDel') + '/' 
    + _.get(content, 'addrPeer') + '/' 
    + _.get(content, 'pkEnc')  + '/' 
    + _.get(content, 'hK')     + '/'
    + feeDel                   + '/'
    + feePeer
}

const View = async (content, router, pubKey) => {
  console.log(content, typeof(content))
  Object.assign(content, {'pubKey' : pubKey})
  const url = makeURL('/content/viewer', content)

  router.push(url)
}

const makeURL = (base, params) => {
  let URL = base;
  let keys = Object.keys(params);
  let values = keys.map((key) => params[key]);

  console.log(keys, values)
  for(let i=0 ; i<keys.length ; i++) {
    URL += (i === 0 ? '?' : '&') + keys[i] + '=' + values[i];
  }
  console.log(URL)
  return URL;
}

export default ContentThumbnail;