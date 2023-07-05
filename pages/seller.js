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
      <Button variant="contained" onClick={() => setRegisterDialogOpen(true)}>등록</Button>
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
            <img
              style={{
                cursor: 'pointer',
              }}
              src={file.imgPath}
              alt={file.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={file.title}
              subtitle={file.description}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)}>
        <DialogTitle>등록</DialogTitle>
        <DialogContent>
          <Input
            sx={{
              display: 'block',
            }}
            type='text'
            placeholder='title'
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <Input
            sx={{
              display: 'block',
            }}
            type='text'
            placeholder='description'
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <Input
            sx={{
              display: 'block',
            }}
            type='file'
            onChange={(event) => {
              setImageFile(event.target.files[0]);
            }}
          />
          <Input
            sx={{
              display: 'block',
            }}
            type='file'
            onChange={(event) => {
              setPdfFile(event.target.files[0]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegisterDialogOpen(false)}>닫기</Button>
          <Button
            onClick={() => {
              setRegisterDialogOpen(false);

              const formData = new FormData();
              formData.append('title', title);
              formData.append('description', description);
              formData.append('img', imageFile);
              formData.append('pdf', pdfFile);

              fetch('http://localhost:8000/api/content/publish', {
                method: 'POST',
                body: formData,
              })
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  setFileList([data, ...fileList]);
                })
                .catch(error => {
                  console.error(error);
                });
            }}
          >
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default uitest;