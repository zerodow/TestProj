// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import Question from './src/screen/Question';
import AnswerResult from './src/screen/AnswerResult';
import QuestionChange from './src/screen/QuestionChange';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="AnswerResult" component={AnswerResult} />
        <Stack.Screen name="QuestionChange" component={QuestionChange} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
