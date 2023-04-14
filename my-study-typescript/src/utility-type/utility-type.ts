interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 상품 목록을 받아오기 위한 API 함수
// function fetchProducts(): Promise<Product[]> {
//   // ...
// }

// interface ProductDetail {
//   id: number;
//   name: string;
//   price: number;
// }

// 📌 Pick<타입, 어떤 타입을 뽑아 쓸건지>
// 타입을 불필요하게 다시 정의하지 않아도 됨 !
// 특정 상품의 상세 정보를 나타내기 위한 함수
export function displayProductDetail(
  shoppingItem: Pick<Product, 'id' | 'name' | 'price'>
) {}

// interface UpdateProduct {
//   id?: number;
//   name?: string;
//   price?: number;
//   brand?: string;
//   stock?: number;
// }

interface Developer {
  name: string;
  skill: string;
}

const human: Pick<Developer, 'name'> = {
  name: '스킬이 없는 사람',
};

type HasThen<T> = Pick<Promise<T>, 'then' | 'catch'>;
let hasThen: HasThen<number> = Promise.resolve(5);
hasThen.then(res => console.log(res + 5)); // 위에서 'then'만 선택하면 'then'만 제공, 'catch' 선택하면 'catch'만 제공

// 📌 Partial
// 특정 상품 정보를 업데이트(갱신)하는 함수
// 일부만 수정하고 싶을 수 있기 때문에
// Partial을 사용하면 모든 속성에 optional(?) 처리한 것과 같음
function updateProductItem(productItem: Partial<Product>) {}

interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}
// 유틸리티 타입 구현하기 - Partial
// #1
// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }

// #2
// type UserProfileUpdate = {
//   username?: UserProfile['username'];
//   email?: UserProfile['email'];
//   profilePhotoUrl?: UserProfile['profilePhotoUrl'];
// };

// #3
// type UserProfileUpdate = {
//   // 반복문으로 도는 것
//   [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p];
// };

// type UserProfileKeys = keyof UserProfile;

// #4
type UserProfileUpdate = {
  [p in keyof UserProfile]?: UserProfile[p];
};

// 최종적으로 Partial
type Partial<T> = {
  [p in keyof T]?: T[p];
};

interface Address {
  email: string;
  address: string;
}

type MayHaveEmail = Partial<Address>;

const me: MayHaveEmail = {}; // 가능
const you: MayHaveEmail = { email: 'test@test.com' }; // 가능
const all: MayHaveEmail = { email: 'test@test.com', address: 'Seoul' }; // 가능

// 📌 Omit
interface AddressBook {
  name: string;
  phone: string;
  address: string;
  company: string;
}
const phoneBook: Omit<AddressBook, 'address'> = {
  name: '재택근무',
  phone: '01011112222',
  company: '본인 집',
};
const restaurant: Omit<AddressBook, 'address' | 'company'> = {
  name: '레스토랑',
  phone: '01033334444',
};
