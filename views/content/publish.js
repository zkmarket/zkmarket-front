import FileInput from "@/components/FileInput"
import { publishContent } from "@/utils/content/api"
import { Card, CardContent, CardActions, Typography, Button, TextField, useTheme } from "@mui/material"
import { useState } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';

const TEXT_LIMIT = 5000

const ContentPublish = ({ onPublished, onCanceled }) => {
  const theme = useTheme();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState(undefined)
  const [plainText, setPlainText] = useState('')
  const [date, setDate] = useState('')
  const [fee, setFee] = useState('')
  const [img, setImg] = useState()

  const handlePublish = async () => {
    console.log(pdf)
    // await publishContent(title, description, date, price, img, pdf)
    window.location.href = 'zkmarket://register/' + title + '/' + description + '/' + author??'none' 
    await publishContent(title, description, plainText, fee, date, img)
    onPublished()
  }

  useEffect(() => {
    console.log(!title || !description)
  }, [title, description])

  return (
    <>
      <Card sx={{
        width: useMediaQuery(theme.breakpoints.down('sm')) ? '100%' : '50vw',
        maxWidth: '640px',
        minWidth: useMediaQuery(theme.breakpoints.down('sm')) ? '' : '480px'
      }} elevation={0}>
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
            required
            fullWidth
            id="description"
            label="Description"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            id="text"
            label="Text"
            size="small"
            multiline
            rows={15}
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            inputProps={{ maxLength: TEXT_LIMIT }}
            helperText={`${plainText.length}/${TEXT_LIMIT}`}
            FormHelperTextProps={{
              style: {
                marginLeft: 'auto',
                fontSize: 12,
              },
            }}
          />
          {/* <TextField
            fullWidth
            id="date"
            label="Publish Date"
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          /> */}
          <TextField
            required
            fullWidth
            id="fee"
            label="Fee"
            size="small"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
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
          <Button disabled={!title || !description || !plainText || !fee} onClick={handlePublish} variant='contained'>Publish</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default ContentPublish