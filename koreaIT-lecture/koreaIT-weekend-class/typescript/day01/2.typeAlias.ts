{
  // 타입 지정

  type Text = string;
  let str: Text = '안녕하세요';

  type TextString = 'zl존성용123';
  //   let str2: TextString = '안녕하세요'; // 다른 값이 들어갈 수 없음

  type User = {
    userId: number;
    name: string;
  };

  type Post = {
    postId: number;
    content: string;
    user: User;
  };

  const post: Partial<Post> = {
    // Partial : 일부만 써도 괜찮음
    content: '안녕하세요',
    postId: 1,
    user: {
      name: '김성용',
      userId: 3,
    },
  };

  // union
  type Product = 'food' | 'cloth';
  // 나중에 공용 컴포넌트 속성에 들어가는 것들을
  // type = "small" | "medium" | "large" 로 하고
  // 나중에 사용할 때 자동완성으로 type으로 지정한 것들이 뜨게 될 것 !

  const store = (product: Product) => {
    console.log(product);
  };

  store('cloth');

  // intersection type
  type Student = {
    name: string;
    score: number;
  };

  const internet = (person: Student & User) => {
    // 두 개의 타입 속성이 합쳐지게 됨
    // ==> Student의 속성값과 User의 속성값 모두 전부 있어야 함
    console.log(person);
  };

  internet({
    userId: 1,
    name: '김성용',
    score: 90,
  });

  type Color = {
    [key: string]: string;
  };
  // -> 자동완성 X  ==> 다른 개발자에게 어떤 형태의 객체인지 알려주는 용도의 문서화

  const COLORS: Color = {
    gray: '#E5E5E5',
    red: '#FEFEFE',
  };
}
