import { Button, Card, CardContent, Dialog, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ContentPublish from "@/views/content/publish";
import { getContentList } from "@/utils/content/api";
import useMediaQuery from '@mui/material/useMediaQuery';

import Link from "next/link";
import { useParams,useSearchParams } from 'next/navigation'

import ContentList from "@/views/content/list";

const Content = () => {

  const searchParams = useSearchParams()

  let pubKey = (() => {return searchParams.get('pk')})()
  let buttonText = pubKey ? 'View' : 'Purchase'
  
  console.log(pubKey, buttonText)

  const theme = useTheme();
  useEffect(() => {
    console.log(pubKey, buttonText)
    refresh(pubKey)
  }, [pubKey])


  const refresh = async (pubKey) => {
    setIsLoaded(false)
    const result = await getContentList(pubKey)
    setContentList(result)
    setIsLoaded(true)
  }

  const handleCanceled = () => { setShowModal(false) }
  const handlePublished = async () => {
    setShowModal(false)
    await refresh(pubKey)
  }

  const [contentList, setContentList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div width="100vw"
      style={{
        padding: 0,
        margin: 8,
      }}>
      <Grid
        marginBottom={1}
        container={true}
        gap={1}
        justifyContent="space-between"
        alignItems="center">
        <IconButton
          color='primary'
          aria-label="Refresh"
          size="small"
          style={{
            outline: 'solid 1px'
          }}
          onClick={async() => {await refresh(pubKey)}}
        >
          <RefreshOutlined />
        </IconButton>
        <Button variant='contained' onClick={() => setShowModal(true)}>
          Publish Content
        </Button>
      </Grid >
      <ContentList contentList={contentList} isLoaded={isLoaded} isFirstPage={true} buttonText={buttonText} pubKey={pubKey}/>
      <Dialog
        maxWidth='lg'
        fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
        onClose={handleCanceled}
        open={showModal}>
        <ContentPublish onPublished={handlePublished} onCanceled={handleCanceled} />
      </Dialog>
    </div>
  )
}

export default Content;