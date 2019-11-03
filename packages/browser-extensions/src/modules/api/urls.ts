const isDevelopment = process.env.NODE_ENV === 'development';

export const NER_API_URL = isDevelopment
    ? 'http://localhost:5001/extract'
    : 'https://us-central1-articles-summary-239.cloudfunctions.net/ner';
export const SUMMARY_API_URL = isDevelopment
    ? 'http://localhost:5002/sum'
    : 'https://us-central1-articles-summary-239.cloudfunctions.net/sum';
