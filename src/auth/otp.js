import React, {useState, useEffect, useRef} from 'react';
import {hp, wp} from '../constants/styled';
import {
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import CustomHeader from '../constants/header';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Feather from 'react-native-vector-icons/Feather';
import {LOGIN, REGISTER} from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import Timer from '../constants/timer';

import RNOtpVerify from 'react-native-otp-verify';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {otp, mobile_no, userid, countryCode, login} = route?.params;
  const [mobileNo, setMobileNo] = useState(mobile_no);
  const [code, setCode] = useState([
    {id: 1, val: ''},
    {id: 2, val: ''},
    {id: 3, val: ''},
    {id: 4, val: ''},
  ]);
  const [timer, settimer] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputE1 = useRef(null);
  const inputE2 = useRef(null);
  const inputE3 = useRef(null);
  const inputE4 = useRef(null);

  // useEffect(() => {
  //   RNOtpVerify.getHash().then(console.log).catch(console.log);

  //   RNOtpVerify.getOtp()
  //     .then(p => RNOtpVerify.addListener(otpHandler))
  //     .catch(p => console.log(p));

  //   return () => {
  //     RNOtpVerify.removeListener(otpHandler);
  //   };
  // }, []);

  // const otpHandler = message => {
  //   if (message) {
  //     const otp = /(\d{4})/g.exec(message)[1];
  //     let array = [
  //       {id: 1, val: otp[0]},
  //       {id: 2, val: otp[1]},
  //       {id: 3, val: otp[2]},
  //       {id: 4, val: otp[3]},
  //     ];
  //     setCode(array);
  //   }
  // };

  // useEffect (()=>{
  //   console.log(code);
  // }, [code])

  const resendOptSignUp = () => {
    setLoading(true);
    console.log('clicked');
    let formdata = new FormData();

    formdata.append('mobile_no', mobileNo);
    formdata.append('country_code', countryCode);

    fetch(
      'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/resend_otp',
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_no: mobileNo,
          country_code: '+' + countryCode,
        }),
      },
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setLoading(false);
        settimer(true);
      });
  };
  const resendOptLogIn = () => {
    setLoading(true);
    console.log('clicked');
    let formdata = new FormData();

    formdata.append('mobile_no', mobileNo);
    formdata.append('country_code', countryCode);

    fetch(
      'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/resend_otp_login',
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_no: mobileNo,
          country_code: '+' + countryCode,
        }),
      },
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setLoading(false);
        settimer(true);
      });
  };

  const signUpAPI = async () => {
    setLoading(true);
    console.log('clicked');
    // let formdata = new FormData();

    let otpString =
      '' +
      code[0].val +
      '' +
      code[1].val +
      '' +
      code[2].val +
      '' +
      code[3].val +
      '';
    console.log(otpString);
    // formdata.append('mobile_no', mobileNo);
    // formdata.append('country_code', countryCode);

    await fetch(
      'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/register_otp_verify',
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_no: mobileNo,
          otp: otpString,
        }),
      },
    )
      .then(response => response.json())
      .then(response => {
        let userToken;
        userToken = response.access_token;
        try {
          response.status && AsyncStorage.setItem('userToken', userToken);
          console.log('mobileno', mobile_no);
          console.log('cc', countryCode);
          response.status &&
            AsyncStorage.setItem('mobileno', JSON.stringify(mobile_no));
          response.status &&
            AsyncStorage.setItem('cc', JSON.stringify(countryCode));
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        response.status && dispatch(REGISTER(userToken));
        console.log(response);
        setLoading(false);
        !response.status &&
          Alert.alert('Hold on!', 'Please enter a valid OTP.', [
            {
              text: 'okay',
              onPress: () => null,
              style: 'okay',
            },
          ]);
        // settimer(true);
        response.status &&
          navigation.navigate('Questions', {
            userid: response.id,
          });
      })
      .catch(error => {
        setLoading(false);
        Toast.show('Please enter valid OTP.', Toast.LONG);
      });
  };

  const logInAPI = async () => {
    setLoading(true);
    console.log('clicked');

    let otpString =
      '' +
      code[0].val +
      '' +
      code[1].val +
      '' +
      code[2].val +
      '' +
      code[3].val +
      '';
    // let formdata = new FormData();

    // formdata.append('mobile_no', mobileNo);
    // formdata.append('country_code', countryCode);

    await fetch(
      'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/login_otp_verify',
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_no: mobileNo,
          otp: otpString,
        }),
      },
    )
      .then(response => response.json())
      .then(response => {
        !response.status &&
          Alert.alert('Hold on!', 'Please enter a valid OTP.', [
            {
              text: 'okay',
              onPress: () => null,
              style: 'okay',
            },
          ]);
        let userToken;
        userToken = response.access_token;
        try {
          response.status && AsyncStorage.setItem('userToken', userToken);
          response.status &&
            AsyncStorage.setItem('mobileno', JSON.stringify(mobile_no));
          response.status &&
            AsyncStorage.setItem('cc', JSON.stringify(countryCode));
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        response.status && dispatch(LOGIN(userToken));
        console.log(response);
        setLoading(false);
        // settimer(true);

        response.status && navigation.replace('Dashboard');
      })
      .catch(error => {
        setLoading(false);
        Toast.show('Please enter valid OTP.', Toast.LONG);
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
      <KeyboardAvoidingView
        // keyboardVerticalOffset = {Header.HEIGHT + 20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          width: wp(100),
          height: hp(100),
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomHeader title={'OTP Verification'} navigation={navigation} />
        <Image
          source={require('../assets/images/roundICON.png')}
          style={{
            width: hp(15),
            height: hp(15),
            marginTop: hp(5),
          }}
        />
        <View style={styles.loginSec}>
          <Text
            style={{
              color: '#000000',
              fontSize: hp(2),
              fontWeight: 'bold',
              marginTop: hp(5),
            }}>
            Verification
          </Text>
          <Text
            style={{color: '#000000', fontSize: hp(1.8), marginTop: wp(2.5)}}>
            Enter OTP code sent to your number
          </Text>
          <Text
            style={{color: '#000000', fontSize: hp(1.8), marginTop: wp(0.5)}}>
            {mobileNo}
          </Text>

          {/**OTP input view */}
          {/**OTP input view */}

          {/* <OTPInputView
            style={{width: wp(70), height: hp(5), marginTop: wp(5)}}
            pinCount={4}
            code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={text => setCode({text})}
            autoFocusOnLoad
            codeInputFieldStyle={styles.textInput}
            //   codeInputHighlightStyle={styles.underlineStyleHighLighted}
            
          /> */}
          <View
            style={{
              width: wp(70),
              height: hp(5),
              marginTop: wp(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: 'red'
            }}>
            {[
              {id: 1, ref: inputE1},
              {id: 2, ref: inputE2},
              {id: 3, ref: inputE3},
              {id: 4, ref: inputE4},
            ].map((i, index) => (
              <TextInput
                numberOfLines={1}
                maxLength={1}
                keyboardType="number-pad"
                key={index}
                value={code[index].val}
                style={styles.textInput}
                ref={i.ref}
                onChangeText={val => {
                  let newArray = [...code];
                  let objIndex = newArray.findIndex(obj => obj.id == i.id);

                  newArray[objIndex].val = val;

                  setCode(newArray);

                  val == '' && i.id == 4 && inputE3.current.focus();
                  val == '' && i.id == 3 && inputE2.current.focus();
                  val == '' && i.id == 2 && inputE1.current.focus();

                  val != '' && i.id == 1 && inputE2.current.focus();
                  val != '' && i.id == 2 && inputE3.current.focus();
                  val != '' && i.id == 3 && inputE4.current.focus();
                }}
              />
            ))}
          </View>

          {/**OTP input view */}
          {/**OTP input view */}

          {timer && (
            <View style={{marginTop: wp(5)}}>
              <Timer settimer={settimer} />
            </View>
          )}

          <Text style={{color: '#202020', fontSize: hp(1.8), marginTop: hp(5)}}>
            Don’t receive an OTP ?
          </Text>

          <Pressable
            onPress={() => {
              if (!timer) {
                login ? resendOptLogIn() : resendOptSignUp();
              }
            }}
            style={{flexDirection: 'row', marginTop: wp(2.5)}}>
            <Text
              style={[
                {
                  fontSize: (height * 1.8) / 100,
                  textAlign: 'center',
                  color: '#F9AD19',
                  fontWeight: 'bold',
                  marginRight: (width * 2.5) / 100,
                },
                timer && {color: '#C3C3C3'},
              ]}>
              Resend OTP
            </Text>
            <Feather
              size={(height * 2) / 100}
              name="arrow-right"
              color={!timer ? '#F9AD19' : '#C3C3C3'}
            />
          </Pressable>

          <Pressable
            onPress={() => {
              login ? logInAPI() : signUpAPI();
            }}
            style={[
              styles.NXTButton,
              timer ? {marginTop: hp(20)} : {marginTop: hp(25)},
            ]}>
            <Text style={{color: 'white', fontSize: (height * 1.8) / 100}}>
              NEXT
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: (height * 5) / 100,
    height: (height * 5) / 100,
    // marginLeft: (width * 5) / 100,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: (height * 1) / 100,
    borderBottomWidth: hp(0.2),
    // borderColor: '#D4D4D4',
    borderColor: '#000000',
    // flexDirection: 'row',
    paddingHorizontal: (width * 2.5) / 100,
    textAlign: 'center',
  },
  loginSec: {
    // position: 'absolute',
    // bottom: height*5/100,
    flex: 1,
    width: width,
    marginTop: (height * 4) / 100,
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

export default Otp;
