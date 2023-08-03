import { requestAPI } from '@/utils/core'

export const getContentList = async (pubKey, page, page_size) => {
  const searchParams = {};
  console.log(pubKey, page, page_size)
  if (page) searchParams["page"] = page;
  if (page_size) searchParams["page_size"] = page_size;

  const URL = 'content/list' + (() =>{return pubKey ? '?pk_enc=' + pubKey : ''})()
  console.log(URL)
  const result = await requestAPI("GET", URL);
  return result;
}

export const getData = async (pk_enc, h_k) => {
  if(pk_enc ==undefined || h_k == undefined) {return ''}

  const URL = `content/getData/${h_k}/${pk_enc}/`
  console.log(URL)
  const result = await requestAPI("GET", URL);
  return result;
}

export const publishContent = async (title, description, text, fee, date, img) => {
  let formData = new FormData();
  formData.set('title', title);
  formData.set('description', description);
  formData.set('plain_text', text);
  formData.set('fee', fee);
  if (date) formData.set('date', date);
  if (img) formData.set('img', img);

  console.log(formData);

  const result = await requestAPI(
    "POST",
    'content/publish',
    undefined,
    'multipart/form-data',
    undefined,
    formData
  );

  return result
}