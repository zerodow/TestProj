import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import Header from '../../components/Header';
import ItemAnswer from './ItemAnswer';
import {useNavigation} from '@react-navigation/native';

const AnswerResult = ({route}) => {
  const navigation = useNavigation();
  const ref = useRef({
    detailCateRaw: route.params.detailCateRaw,
  }).current;

  const [answer, setAnswer] = useState(route.params.result);
  const [list, setList] = useState([]);
  console.log('route dm', route);
  useEffect(() => {
    const {detailCateRaw, result} = route.params;
    const mergeArr = detailCateRaw.listQuestion.map(element => {
      const obj = result.listQuestion.find(
        item => item.questionId === element.questionId,
      );
      return {
        ...element,
        answer: obj?.answer,
      };
    });
    setList(mergeArr);
    ref.detailCateRaw = {...detailCateRaw, listQuestion: mergeArr};
  }, [route]);

  const submit = () => {
    return Alert.alert('Notification', 'Are you sure you want to submit?', [
      {
        text: 'No',
      },
      {text: 'Yes', onPress: () => navigation.goBack()},
    ]);
  };

  const _handleNewResult = (itemChange, result) => {
    setAnswer({
      ...answer,
      listQuestion: answer.listQuestion.map(item => {
        if (item.questionId === itemChange.questionId) {
          return {
            ...item,
            answer: result,
          };
        }
        return {...item};
      }),
    });
  };

  const goDetailAnswer = itemChange => {
    navigation.navigate('QuestionChange', {
      listQuestion: ref.detailCateRaw.listQuestion.filter(
        item =>
          item.questionId === itemChange.questionId ||
          item.dependentOn === itemChange.questionId,
      ),
      dataChange: itemChange,
      onDoneChange: result => _handleNewResult(itemChange, result),
    });
  };

  const _renderItem = ({item, index}) => {
    if (!item.answer) {
      return null;
    }
    return (
      <ItemAnswer item={item} index={index} onPressChange={goDetailAnswer} />
    );
  };
  return (
    <LayoutWrapper>
      <Header title={'Result'} />
      <View style={styles.container}>
        <FlatList
          data={list}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item.questionId}
          contentContainerStyle={styles.flatlistStyle}
        />
        <TouchableOpacity onPress={submit} style={styles.button}>
          <Text style={styles.nextButton}>Submit answer</Text>
        </TouchableOpacity>
      </View>
    </LayoutWrapper>
  );
};

export default AnswerResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatlistStyle: {padding: 0},
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'blue',
  },
  nextButton: {fontSize: 20, color: 'white'},
});
