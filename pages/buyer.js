import React, { useState, useRef } from 'react';

import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Input from '@mui/material/Input';

const uitest = () => {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [fileList, setFileList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <Button
        sx={{marginLeft: 1}}
        variant="outlined"
        onClick={() => {
          fetch('http://localhost:8000/api/content/list')
            .then((res) => res.json())
            .then((data) => setFileList(data))
            .catch((error) => console.log(error))
        }}
      >
        조회
      </Button>
      <ImageList cols={5} gap={8}>
        {fileList.map((file, index) => (
          <ImageListItem key={index}>
            <a
              href={file.pdfPath}
            >
              <img
                style={{
                  cursor: 'pointer',
                }}
                src={file.imgPath}
                alt={file.title}
                loading="lazy"
              />
            </a>
            <ImageListItemBar
              title={file.title}
              subtitle={file.description}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}

export default uitest;