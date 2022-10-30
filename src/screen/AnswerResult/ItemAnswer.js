import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';

const ItemAnswer = ({item, index, onPressChange}) => {
  const answerShow = useMemo(() => {
    if (item?.answer?.content) {
      return item?.answer?.content;
    }
    return item?.answer;
  }, [item]);

  const _onPressChange = () => {
    onPressChange && onPressChange(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${index + 1}. ${item.title}`}</Text>
      <View style={styles.answerStyle}>
        <Text style={styles.t1}>Your answer: </Text>
        <Text style={styles.t1}>{answerShow}</Text>
      </View>
      <TouchableOpacity style={styles.view} onPress={_onPressChange}>
        <Text style={styles.txt}>Change your answer >></Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemAnswer;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
  },
  title: {fontSize: 21},
  answerStyle: {flex: 1, flexDirection: 'row', marginVertical: 10},
  t1: {fontSize: 16, fontWeight: '500'},
  view: {
    width: 170,
    alignSelf: 'flex-end',
  },
  txt: {textAlign: 'right', color: 'red'},
});
