import { requestAPI } from '@/utils/core'

export const getContentList = async (page, page_size) => {
  const searchParams = {};
  if (page) searchParams["page"] = page;
  if (page_size) searchParams["page_size"] = page_size;

  const result = await requestAPI("GET", 'content/list');
  return result;
}

export const publishContent = async (title, description, date, price, img, pdf) => {
  let formData = new FormData();
  formData.set('title', title);
  formData.set('description', description);
  if (date) formData.set('date', date);
  if (price) formData.set('price', price);
  if (img) formData.set('img', img);
  if (pdf) formData.set('pdf', pdf);

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