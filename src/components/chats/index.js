import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  BackHandler,
  Alert,
  FlatList,
  TextInput,
} from 'react-native';
import CustomHeader from '../../constants/header';
import CustomHeaderTwo from '../../constants/headerTwo';
import Footer from '../footer';
import MobileInput from '../../constants/mobileinput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Feather from 'react-native-vector-icons/Feather';
import {wp, hp} from '../../constants/styled';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Chats = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: wp(100),
            height: hp(100),
            top: 0,
            left: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 1,
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <View
        style={{
          width: width,
          height: height,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomHeader
          title={'Chats'}
          backbutton={false}
          navigation={navigation}
        />

        <Text style={{alignSelf: 'center', fontSize: hp(1.8)}}>
          This is Chats
        </Text>

        <View
          // style={{marginTop: -hp(10)}}
          style={{position: 'absolute', bottom: hp(2)}}>
          <Footer navigation={navigation}  selected={4}/>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginSec: {
    flex: 1,
    width: width,
    marginTop: (height * 5) / 100,
    borderTopLeftRadius: (height * 5) / 100,
    borderTopRightRadius: (height * 5) / 100,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
  },
  NXTButton: {
    width: (width * 85) / 100,
    height: (height * 5) / 100,
    backgroundColor: '#F9AD19',
    borderRadius: (height * 1) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (width * 2.5) / 100,
  },
});

export default Chats;
