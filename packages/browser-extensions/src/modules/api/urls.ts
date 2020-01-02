const isDevelopment = process.env.NODE_ENV === 'development';

export const NER_API_URL = isDevelopment ? 'http://localhost:5001/extract' : 'https://rd-ner.herokuapp.com/extract';
export const SUMMARY_API_URL = isDevelopment ? 'http://localhost:5002/sum' : 'https://rd-summ.herokuapp.com/sum';
