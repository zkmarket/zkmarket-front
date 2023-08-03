import _ from 'lodash'
import { fakeContent } from "@/static/fakeDB";
import { Card, CardContent, CardHeader, CardMedia, Typography, useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getData } from '@/utils/content/api';

const Viewer = () => {
  const router = useRouter();
  console.log("content : ", router.query)
  const {title, author, img_path, pubKey, hK} = router.query;

  console.log(title)
  console.log(hK)
  const theme = useTheme();
  const [text, setText] = useState([''])
  const paragraphs = fakeContent.data.split('\n').filter(p => p.length > 0)

  useEffect(() => {
    getData(pubKey, hK).then((res) => {
      if(pubKey == undefined || hK == undefined) {return}
      console.log("getData : ", _.get(res, 'text'))
      setText(_.get(res, 'text').split('\n').filter(p => p.length > 0))
    })
  },[hK])

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
        <CardHeader title={title} subheader={author} />
        <CardMedia
          component="img"
          image={img_path}
          width='100%' />

        <CardContent>
          {
            text.map((p, idx) => (
              <div key={idx}>
                < Typography >
                  {p}
                  {/* {text} */}
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