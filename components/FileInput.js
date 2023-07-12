import { useRef, useState } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";

const FileInput = ({ label, onChange, error, accept }) => {
  const ref = useRef();
  const [attachment, setAttachment] = useState(null);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    const [file] = files;
    setAttachment(file);
    if (!!onChange) onChange({ target: { value: file } });
  };

  return (
    <Grid alignItems={'center'} display={'flex'} gap={1}>
      <TextField
        fullWidth
        id="name"
        label={label}
        defaultValue={'Select File'}
        value={attachment?.name}
        disabled
        size="small"
         />
      <Button
        variant="outlined"
        component="label"
        size="medium"
      >
        upload
        <input
          ref={ref}
          type="file"
          accept={accept}
          hidden
          onChange={handleChange}
        />
      </Button>
    </Grid>
  );
};

export default FileInput;
