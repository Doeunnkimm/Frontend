import { View, Text } from 'react-native';

const PrimaryButton = (props) => {
  const { children } = props;

  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};

export default PrimaryButton;
