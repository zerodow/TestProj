import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';

const Empty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No question for this category</Text>
    </View>
  );
};

export default memo(Empty);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 16},
});
