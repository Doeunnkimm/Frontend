## Expo 시작하기

```bash
$ npm install -g expo-cli
$ expo init {프로젝트명}
```

## 앱 실행해보기

```bash
$ pnpm start
```

## 스타일링

- [공식문서 - Style](https://reactnative.dev/docs/style)
- [공식문서 - Colors](https://reactnative.dev/docs/colors)
- [공식문서 - View](https://reactnative.dev/docs/view)

## ScrollView

- [공식문서 = ScrollView](https://reactnative.dev/docs/scrollview)

## Pressable 컴포넌트

- 아이템을 터치할 수 있게 하려면 .. (→ WEB에서와 같이 onClick은 아님)
- `Pressable` 컴포넌트를 사용
- pressed 되었을 때 스타일을 주고 싶다면
  ```js
  <Pressable style={({ pressed }) => pressed && styles.pressedItem} />
  ```
