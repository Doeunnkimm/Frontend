import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  const handleGoalInput = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const handleAddGoal = () => {
    setCourseGoals((prev) => [...prev, enteredGoalText]);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal!'
          onChangeText={handleGoalInput}
        />
        <Button
          title='Add Goal'
          onPress={handleAddGoal}
        />
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={({ item }, index) => (
            <View
              key={index}
              style={styles.goalItem}>
              <Text style={styles.goalText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
  },
});

/**
 * @NOTE
 * - web에서 하듯이 display: 'flex'를 하게 되면 안 먹음
 * - flexDirection: 'row' === display: 'flex'랑 같은 역할
 */

/**
 * @NOTE
 * - iOS에서와 Android에서 스타일링이 다르게 적용되는 경우가 존재한다.
 * - 예를 들어, Text에 borderRadius를 적용할 경우
 * - 안드에서는 background에 잘 적용되지만, 아요에서는 잘 적용 X
 * - 이럴 경우를 대비하여 상위에 <View>를 감싸 사용해야 하는 경우가 존재한다.
 */

/**
 * @NOTE
 * - <ScrollView>를 사용할 경우, 스크롤 가능한 영역은 부모 요소가 결정
 * - 정확하게 스크롤 영역을 스타일링 하고 싶다면 부모에 <View>를 통해 스타일링 해야 함
 */
