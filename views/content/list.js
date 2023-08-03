import { Card, CardContent, Grid, Typography } from "@mui/material";
import ContentThumbnail from "@/views/content/thumbnail";
import { useState } from "react";

const ContentList = ({contentList, isLoaded, isFirstPage = false, buttonText='Purchase', pubKey=null}) => {
  return (
    <>
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
                    <ContentThumbnail content={content} buttonText={buttonText} pubKey={pubKey}/>
                  </Grid>
                )
              })
            }
          </Grid >
          :
          // Loading or No Contents
          <Card
            sx={{
              width: '100%'
            }}
            variant="outlined">
            <CardContent sx={{ padding: 1 }}>
              <Typography align='center' variant="h5" component="div">
                {isLoaded ? isFirstPage ? '' : 'There is no contents' : 'Loading Contents...'}
              </Typography>
            </CardContent>
          </Card>
      }
    </>
  )
}

export default ContentList