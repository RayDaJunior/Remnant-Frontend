/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useMemo, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Main from './src/navigation';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import loginToken from './src/store/reducers/initialLogin';
import pageno from './src/store/reducers/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
//actions
import {RETRIVE_TOKEN, LOGIN, LOGOUT, REGISTER} from './src/store/actions/auth';
//actions

const store = configureStore({
  reducer: {
    loginToken: loginToken,
    pageno: pageno,
  },
});



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Main />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
