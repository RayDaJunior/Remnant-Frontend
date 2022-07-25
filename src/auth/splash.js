import React, {useState, useMemo, useEffect} from 'react';
import {View, Image, Dimensions, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
//action
import {RETRIVE_TOKEN, LOGIN, LOGOUT, REGISTER} from '../store/actions/auth';
//action

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Splash = ({navigation}) => {
  const [phone, setPhone] = useState(AsyncStorage.getItem('mobileno'));
  const [cc, setCC] = useState(AsyncStorage.getItem('cc'));
  const [loading, setLoading] = useState(false);
  const loginState = useSelector(state => state.loginToken);
  const dispatch = useDispatch();

  const loginAPI = () => {
    setLoading(true);
    console.log(phone._W.substring(1, 11));
    console.log('+' + cc._W.substring(1, 3));
    console.log('clicked');
    // setLoading(true);

    phone === undefined &&
      Toast.show('Please enter a valid phone no.', Toast.LONG);
    phone === undefined && setLoading(false);
    phone === undefined && setError(true);
    phone !== undefined &&
      fetch(
        'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/valid_user',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile_no: phone._W.substring(1, 11),
            country_code: '+' + cc._W.substring(1, 3),
          }),
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setLoading(false);
          response.status && navigation.replace('Dashboard');
          !response.status && navigation.replace('Login');
        })
        .catch(error => {
          Toast.show('Phone no is not registered.', Toast.LONG);
        });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch(RETRIVE_TOKEN(userToken));
      userToken === null && navigation.replace('Login');
      userToken !== null && loginAPI();
    }, 1000);
  }, []);

  return (
    <>
      <Image
        source={require('../assets/images/Splash.png')}
        style={{width: width, height: height}}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: width,
            height: height,
            top: 0,
            left: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

export default Splash;
