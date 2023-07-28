import { Button, Card, CardContent, Dialog, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ContentThumbnail from "@/views/content/thumbnail";
import ContentPublish from "@/views/content/publish";
import { getContentList } from "@/utils/content/api";
import useMediaQuery from '@mui/material/useMediaQuery';

const Content = () => {
  const theme = useTheme();
  useEffect(() => {
    refresh()
  }, [])


  const refresh = async () => {
    setIsLoaded(false)
    const result = await getContentList()
    setContentList(result)
    setIsLoaded(true)
  }

  const handleCanceled = () => { setShowModal(false) }
  const handlePublished = async () => {
    setShowModal(false)
    await refresh()
  }

  const [contentList, setContentList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Grid
        marginBottom={1}
        container={true}
        gap={1}
        justifyContent="flex-end"
        alignItems="center">
        <IconButton
          color='primary'
          aria-label="Refresh"
          size="small"
          style={{
            outline: 'solid 1px'
          }}
          onClick={refresh}
        >
          <RefreshOutlined />
        </IconButton>
        <Button variant='contained' onClick={() => setShowModal(true)}>
          Publish Content
        </Button>
        {/* <Button variant='contained' onClick={() => {

        }}>
          Publish Content Test
        </Button> */}
      </Grid >
      {
        contentList.length
          ?
          // There is(are) Content(s)
          <Grid
            container={true}>
            {
              contentList.map((content) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ padding: 1 }}
                    key={content.id} >
                    <ContentThumbnail content={content} />
                  </Grid>
                )
              })
            }
          </Grid >
          :
          // Loading or No Contents
          <Card variant="outlined">
            <CardContent sx={{ padding: 1 }}>
              <Typography align='center' variant="h5" component="div">
                {isLoaded ? 'There is no contents' : 'Loading Contents...'}
              </Typography>
            </CardContent>
          </Card>
      }
      <Dialog
        maxWidth='lg'
        fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
        onClose={handleCanceled}
        open={showModal}>
        <ContentPublish onPublished={handlePublished} onCanceled={handleCanceled} />
      </Dialog>
    </>
  )
}

export default Content;