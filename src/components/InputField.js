import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';

const InputField = (props, _ref) => {
  useImperativeHandle(_ref, () => ({getValue, setInitValue}));
  const [value, setValue] = useState();
  const [error, setError] = useState('');

  const _onChangeText = txt => {
    setValue(txt);
  };

  const setInitValue = txt => {
    setValue(txt);
  };

  const getValue = () => {
    return value;
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderColor: error ? 'red' : 'gray',
          },
        ]}>
        <TextInput
          value={value}
          underlineColorAndroid={'transparent'}
          style={styles.input}
          multiline={true}
          onChangeText={_onChangeText}
        />
      </View>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

export default forwardRef(InputField);

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
  },
  input: {
    height: 90,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
});
