// 타입 정의
// 이미지, 아이콘, 환경 변수 등을 declare로 사용하면 좋다
// mp3나 기타 확장자의 경우 declare module이 필수

// 타입스크립트에서 mp3 파일 사용하려면
// declare module "*.mp3"

// declare module 모듈 선언
declare module '@env' {
  export const BACK_URL: process.env.REACT_APP_BACK_URL;
}
