function foodReport(name, age, ...favoriteFoods) {
  console.log(name + ", " + age);
  console.log(favoriteFoods); // 가변 파라미터 -> 배열 형태로 전달
}

foodReport("이몽룡", 20, "짜장면", "냉면", "불고기");
foodReport("홍길동", 16, "초밥");
