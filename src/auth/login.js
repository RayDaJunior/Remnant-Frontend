import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CustomHeader from '../constants/header';
import MobileInput from '../constants/mobileinput';
import Toast from 'react-native-simple-toast';

import Feather from 'react-native-vector-icons/Feather';
import {wp, hp} from '../constants/styled';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('1');
  const [phone, setphone] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    phone != undefined && setError(false);
  }, [phone]);

  const loginAPI = () => {
    console.log('clicked');
    setLoading(true);

    phone === undefined &&
      Toast.show('Please enter a valid phone no.', Toast.LONG);
    phone === undefined && setLoading(false);
    phone === undefined && setError(true);
    phone !== undefined &&
      fetch(
        'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/member_login',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile_no: phone,
            country_code: '+' + countryCode,
          }),
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setLoading(false);
          response.status &&
            navigation.navigate('Otp', {
              otp: response.otp,
              mobile_no: phone,
              countryCode: countryCode,
              login: true,
            });
          !response.status &&
            Alert.alert('Hold on!', 'Phone number not found. Please sign up.', [
              {
                text: 'okay',
                onPress: () => null,
                style: 'okay',
              },
            ]);
        })
        .catch(error => {
          Toast.show('Phone no is not registered.', Toast.LONG);
        });
  };

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
          title={'Log in'}
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
          <MobileInput
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            phone={phone}
            setphone={setphone}
            error={error}
          />
          <Text
            style={{
              width: (width * 85) / 100,
              fontSize: (height * 1.5) / 100,
              marginTop: (width * 2.5) / 100,
              textAlign: 'center',
              color: '#202020',
            }}>
            You will receive a 4 digit code for mobile number verification.
          </Text>

          <Text
            style={{
              width: (width * 85) / 100,
              fontSize: (height * 1.8) / 100,
              marginTop: (height * 5) / 100,
              textAlign: 'center',
              color: '#202020',
            }}>
            Don’t have an account ?
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Signup')}
            style={{flexDirection: 'row', marginTop: (width * 2.5) / 100}}>
            <Text
              style={{
                fontSize: (height * 1.8) / 100,
                textAlign: 'center',
                color: '#F9AD19',
                fontWeight: 'bold',
                marginRight: (width * 2.5) / 100,
              }}>
              Sign Up
            </Text>
            <Feather
              size={(height * 2.3) / 100}
              name="arrow-right"
              color={'#F9AD19'}
            />
          </Pressable>
          {/*Next button and others */}
          {/*Next button and others */}
          <View
            style={{
              width: (width * 85) / 100,
              position: 'absolute',
              alignSelf: 'center',
              bottom: 50,
            }}>
            <Text
              style={{
                width: (width * 85) / 100,
                fontSize: (height * 1.5) / 100,
                textAlign: 'center',
                color: '#202020',
              }}>
              OTP sent to your registered mobile number.
            </Text>
            <Pressable onPress={() => loginAPI()} style={styles.NXTButton}>
              <Text style={{color: 'white', fontSize: (height * 1.8) / 100}}>
                NEXT
              </Text>
            </Pressable>
            <View
              style={{
                width: (width * 85) / 100,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: (width * 2.5) / 100,
              }}>
              <Text
                style={{
                  // width: (width * 85) / 100,
                  // height: hp(4),
                  fontSize: (height * 1.8) / 100,
                  textAlign: 'center',
                  color: '#202020',
                }}>
                Trouble logging in ?{' '}
              </Text>
              <Pressable style={{justifyContent: 'center', height: hp(6)}} onPress={() => navigation.navigate('Contact')}>
                <Text
                  style={{
                    fontSize: (height * 1.8) / 100,
                    color: '#000000',
                    fontWeight: 'bold',
                  }}>
                  Contact Admin
                </Text>
              </Pressable>
            </View>
          </View>
          {/*Next button and others */}
          {/*Next button and others */}
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

export default Login;
