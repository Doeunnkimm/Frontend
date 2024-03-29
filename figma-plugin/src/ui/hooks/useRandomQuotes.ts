import { useState } from 'react';
import { Quote } from '../../shared';
import { requestQuotes } from '../api';

export const useRandomQuotes = () => {
  const [quotesData, setQuotesData] = useState<Quote[] | null>(null);

  // 인용문 목록 API 응답값이 항상 같으므로 처음 요청하고서는 캐싱. 이후에는 캐싱 데이터 변환
  const getQuotes = async () => {
    if (quotesData) {
      return quotesData;
    }
    const apiQuotes = await requestQuotes();
    setQuotesData(apiQuotes);
    return apiQuotes;
  };

  // 인용문 목록 중 임의의 아이템을 선택하여 반환
  const getRandomQuote = async () => {
    const quotes = await getQuotes();
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return quote;
  };

  return getRandomQuote;
};
