import axios from 'axios';
import { Quote } from '../../shared';

const apiUrl = 'https://type.fit/api/quotes';

export const requestQuotes = async () => {
  const { data } = await axios.get<Quote[]>(apiUrl);
  return data;
};
