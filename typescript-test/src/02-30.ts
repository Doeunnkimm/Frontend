// 타입 별칭을 활용해 다른 타입을 선언 가능

type PersonType = {
  name: string;
  mobile: string;
  birthYear?: number;
};

type PersonListType = {
  pageNo: number;
  pageSize: number;
  persons: PersonType[];
};

const personList: PersonListType = {
  pageNo: 2,
  pageSize: 4,
  persons: [
    { name: "도은", mobile: "010-2222-1111" },
    { name: "유나", mobile: "010-2222-1111", birthYear: 1993 },
    { name: "유정", mobile: "010-2222-1113", birthYear: 1992 },
  ],
};
