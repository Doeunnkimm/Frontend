import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext(); // 컨텍스트 값

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails); // 값 꺼내오기

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }

  return contextValue;
}

export function OrderDetailProvider(props) {
  // OrderDetails은 주문한 스쿱과 토핑의 수
  // 그리고 아이스크립이 어떤 맛인지 또 어떤 토핑을 얹는지를 뜻함
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // ex. { Chocolate: 1, Vanilla: 2 }
    toppings: {}, // ex. { "Gummi Bears": 1 }
  });

  const updateItemCount = (itemName, newItemCount, optionType) => {
    const newOptionCounts = { ...optionCounts };
    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  };

  // Util 함수
  const calculateTotal = optionType => {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
