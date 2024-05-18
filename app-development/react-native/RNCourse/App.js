import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ margin: 16, borderWidth: 2, borderColor: '#FF0000', padding: 16 }}>인라인으로 스타일링</Text>
      <Text style={styles.dummyText}>StyleSheet으로 스타일링</Text>
      <Button title='Button은 title 속성을 통해 입력해요' />
    </View>
  );
}

// NOTE: StyleSheet을 이용하면 스타일 프로퍼티 키값 자동완성을 제공
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyText: {
    margin: 16,
    borderWidth: 2,
    borderColor: 'red',
    padding: 16,
  },
});
