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
} from 'react-native';
import CustomHeader from '../constants/header';
import CustomHeaderTwo from '../constants/headerTwo';
import Footer from './footer';
import MobileInput from '../constants/mobileinput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {UPDATE_PAGE} from '../store/actions/actions';

import Feather from 'react-native-vector-icons/Feather';
import {wp, hp} from '../constants/styled';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DashboardTemp = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('1');
  const [phone, setphone] = useState();
  const [loading, setLoading] = useState(false);
  const [eventArray, setEventArray] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getEvents();
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getEvents = async () => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem('userToken');

    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    };

    console.log(TOKEN);

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/events`,
      {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          status: 0,
        }),
      },
    )
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        setEventArray(result.data);
        // console.log(result.data);
      });
  };

  //events
  //events

  //events
  //events

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
          title={'Home'}
          backbutton={false}
          navigation={navigation}
        />

        <Image
          source={require('../assets/images/roundICON.png')}
          style={{
            width: (height * 15) / 100,
            height: (height * 15) / 100,
            marginTop: (height * 5) / 100,
          }}
        />

        <View style={styles.loginSec}>
          <Text
            style={{
              marginTop: hp(5),
              fontSize: hp(5),
              color: 'black',
              fontWeight: 'bold',
            }}>
            We are
          </Text>
          <Text style={{fontSize: hp(5), color: '#F9AD19', fontWeight: 'bold'}}>
            Coming Soon.
          </Text>
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

export default DashboardTemp;
