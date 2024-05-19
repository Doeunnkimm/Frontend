import { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';

const GoalInput = (props) => {
  const { setCourseGoals } = props;

  const [enteredGoalText, setEnteredGoalText] = useState('');

  const handleGoalInput = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const handleAddGoal = () => {
    setCourseGoals((prev) => [...prev, enteredGoalText]);
  };

  return (
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
  );
};

export default GoalInput;

const styles = StyleSheet.create({
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
});
