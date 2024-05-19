import { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Modal } from 'react-native';

const GoalInput = (props) => {
  const { setEnteredGoalText, onAddGoal, visible, onCloseModal } = props;

  const handleGoalInput = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  return (
    <Modal
      visible={visible}
      animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal!'
          onChangeText={handleGoalInput}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='Add Goal'
              onPress={onAddGoal}
            />
          </View>
          <View style={styles.button}>
            <Button
              title='Cancel'
              onPress={onCloseModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '100%',
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
