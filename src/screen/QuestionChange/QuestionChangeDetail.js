import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import CheckBox from '../../components/CheckBox';
import InputField from '../../components/InputField';

const QuestionChangeDetail = ({data, onSubmitAnswer}) => {
  const ref = useRef({
    inputRef: null,
    checkIndex: null,
  }).current;
  const listAnswer = useMemo(() => data?.listAnswer, [data]);

  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    LayoutAnimation.spring();
    ref.checkIndex = null;
    if (data?.haveRawAnswer) {
      setCanNext(true);
    } else {
      setCanNext(false);
    }
    if (data.answer?.id) {
      if (listAnswer) {
        listAnswer.forEach((item, index) => {
          if (item.id === data.answer.id) {
            ref[`itemCheckBox${index}`]?.check();
          }
        });
      }
    } else {
      ref.inputRef?.setInitValue(data.answer);
    }
  }, [data, listAnswer, ref]);

  const _handleOnCheck = ind => {
    ref.checkIndex = ind;
    if (!listAnswer) return;
    listAnswer?.forEach((element, index) => {
      if (index !== ind) {
        ref[`itemCheckBox${index}`]?.unCheck();
      }
    });
    if (!canNext) {
      setCanNext(true);
    }
  };

  const _submitAnswer = () => {
    if (data?.haveRawAnswer) {
      const value = ref.inputRef?.getValue();
      if (!value) {
        return Alert.alert('Please fill your answer');
      }
      return onSubmitAnswer(value);
    }
    onSubmitAnswer &&
      onSubmitAnswer(
        listAnswer.find((item, index) => index === ref.checkIndex),
      );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.v2}>
        <CheckBox
          ref={r => (ref[`itemCheckBox${index}`] = r)}
          index={index}
          onCheck={_handleOnCheck}
          content={item.content}
        />
      </View>
    );
  };

  const renderAnswer = () => {
    if (data?.haveRawAnswer) {
      return (
        <View style={styles.ansPart}>
          <Text style={styles.v1}>Fill in your answer</Text>
          <InputField ref={r => (ref.inputRef = r)} />
        </View>
      );
    }
    return (
      <View style={styles.ansPart}>
        <Text style={styles.v1}>Choose the best answer</Text>
        <FlatList
          data={listAnswer}
          keyExtractor={(item, index) => index + ''}
          extraData={listAnswer}
          renderItem={_renderItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.quesPart}>
        <View style={styles.mainPart}>
          <Text style={styles.titleStyle}>{data.title}</Text>
        </View>
        <Text style={styles.description}>*{data.description}</Text>
      </View>
      {renderAnswer()}
      <TouchableOpacity
        onPress={_submitAnswer}
        disabled={!canNext}
        style={[
          styles.button,
          {
            backgroundColor: canNext ? 'blue' : 'gray',
          },
        ]}>
        <Text style={styles.nextButton}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionChangeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  quesPart: {
    flex: 1,
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 20,
  },
  ansPart: {
    flex: 1,
    backgroundColor: 'white',
  },
  description: {
    textAlign: 'left',
    color: 'blue',
  },
  titleStyle: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  mainPart: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    width: 100,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  v1: {fontSize: 20, fontWeight: '500', marginVertical: 10},
  v2: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  nextButton: {fontSize: 20, color: 'white'},
});
