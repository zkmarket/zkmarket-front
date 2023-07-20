import FileInput from "@/components/FileInput"
import { publishContent } from "@/utils/content/api"
import { Card, CardContent, CardActions, Typography, Button, TextField, InputAdornment, TextareaAutosize } from "@mui/material"
import { useState } from "react"

const DESCRIPTION_LIMIT = 5000

const ContentPublish = ({ onPublished, onCanceled }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState({})
  const [pdf, setPdf] = useState({})

  const handlePublish = async () => {
    console.log(pdf)
    // await publishContent(title, description, date, price, img, pdf)
    onPublished()
  }

  return (
    <>
      <Card sx={{ minWidth: 600 }} elevation={0}>
        <CardContent>
          <Typography variant="h5">
            PUBLISH CONTENT
          </Typography>
        </CardContent>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <TextField
            required
            fullWidth
            id="title"
            label="Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            id="description"
            label="Description"
            size="small"
            multiline
            rows={15}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: DESCRIPTION_LIMIT }}
            helperText={`${description.length}/${DESCRIPTION_LIMIT}`}
            FormHelperTextProps={{
              style: {
                marginLeft: 'auto',
                fontSize: 12,
              },
            }}
          />
          <TextField
            fullWidth
            id="date"
            label="Publish Date"
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            fullWidth
            id="price"
            label="Price"
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <FileInput
            onChange={(e) => setImg(e.target.value)}
            accept='image/*'
            label='Content Image' />
          <FileInput
            onChange={(e) => setPdf(e.target.value)}
            accept='.pdf'
            label='Content PDF' />
        </CardContent>
        <CardActions sx={{
          display: "flex",
          justifyContent: 'right'
        }}>
          <Button onClick={onCanceled} variant='outlined' color='error'>Cancel</Button>
          <Button disabled={!title || !description} onClick={handlePublish} variant='contained'>Publish</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default ContentPublish