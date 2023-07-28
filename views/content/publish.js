import FileInput from "@/components/FileInput"
import TextArea from "@/components/TextArea"
import { publishContent } from "@/utils/api/content"

import { Card, CardContent, CardActions, Typography, Button, TextField, InputAdornment, TextareaAutosize } from "@mui/material"
import { useEffect, useState } from "react"

const ContentPublish = ({ onPublished, onCanceled }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState(undefined)
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState({})
  const [pdf, setPdf] = useState({})

  const handlePublish = async () => {
    console.log(pdf)
    // await publishContent(title, description, date, price, img, pdf)
    window.location.href = 'zkmarket://' + title + '/' + description + '/' + author??'none' 
    onPublished()
  }

  useEffect(() => {
    console.log(!title || !description)
  }, [title, description])

  return (
    <>
      <Card sx={{ minWidth: 400 }} elevation={0}>
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
            fullWidth
            id="author"
            label="author"
            size="small"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
            <TextareaAutosize
              required
              fullWidth
              minRows={7}
              id="descriptoion"
              ariaLabel="Description"
              placeholder="Description"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          {/* <FileInput
            onChange={(e) => setImg(e.target.value)}
            accept='image/*'
            label='Content Image' />
          <FileInput
            onChange={(e) => setPdf(e.target.value)}
            accept='.txt'
            label='Content TEXT' /> */}
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