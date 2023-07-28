import { requestAPI } from '@/utils/core'

export const getContentList = async (page, page_size) => {
  const searchParams = {};
  if (page) searchParams["page"] = page;
  if (page_size) searchParams["page_size"] = page_size;

  const result = await requestAPI("GET", 'content/list');
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