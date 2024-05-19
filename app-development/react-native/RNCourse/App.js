import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [enteredGoalText, setEnteredGoalText] = useState('');

  const handleAddGoal = () => {
    setCourseGoals((prev) => [...prev, { text: enteredGoalText, id: Math.random() }]);
  };

  const handleDeleteGoal = (targetId) => () => {
    setCourseGoals((prev) => prev.filter(({ id }) => targetId !== id));
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput
        setCourseGoals={setCourseGoals}
        onAddGoal={handleAddGoal}
        setEnteredGoalText={setEnteredGoalText}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={({ item }, index) => (
            <GoalItem
              key={index}
              text={item.text}
              onDeleteGoal={handleDeleteGoal(item.id)}
            />
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

  goalsContainer: {
    flex: 5,
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
