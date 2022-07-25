import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import CustomHeader from '../constants/header';
import MobileInput from '../constants/mobileinput';
import CustomModal from '../constants/customModal';
import TwoButton from '../constants/twoButton';

import Feather from 'react-native-vector-icons/Feather';
import {Header} from '@react-navigation/stack';
import {wp, hp} from '../constants/styled';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [keyboard, setkeyboard] = useState(true);
  const [username, setUsername] = useState('');
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState(null);
  const [countryCode, setCountryCode] = useState('1');
  const [phone, setphone] = useState();
  const [image, setImage] = useState('');
  const [imageURI, setImageURI] = useState();
  const [imageType, setImageType] = useState('');
  const [isImageModal, setisImageModal] = useState(false);
  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    image: false,
    displayname: false,
  });

  // useEffect(()=>{
  //   console.log(keyboard);
  // }, [keyboard]);

  useEffect(() => {
    // console.log(phone, 'sign up');
    phone != undefined && setError({...error, phone: false});
  }, [phone]);

  useEffect(() => {
    fullname != '' && setError({...error, name: false});
  }, [fullname]);

  useEffect(() => {
    let noBlankSpace = username.replace(/\s/g, '');
    username != '' && setError({...error, displayname: false});
    username != '' && setUsername(noBlankSpace);
  }, [username]);

  useEffect(() => {
    email != '' && setError({...error, email: false});
  }, [email]);

  useEffect(() => {
    image != '' && setError({...error, image: false});
  }, [image]);

  const uploadGallery = () => {
    // const options = {
    //   mediaType: 'photo',
    //   quality: 0.5,
    //   includeBase64: true,
    // };
    // try {
    //   launchImageLibrary(options, e => {
    //     // console.log(e.didCancel);
    //     setisImageModal(false);
    //     // console.log(e.assets[0].base64);
    //     !e.didCancel && setImageURI(e?.assets[0]);
    //     !e.didCancel && setImage(e?.assets[0]?.base64);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
    }).then(image => {
      setisImageModal(false);
      // console.log(image.data, '=========', image.mime);
      setImage(image.data);
      setImageType(image.mime);
    });
  };
  const uploadCamera = async () => {
    // const options = {
    //   mediaType: 'photo',
    //   quality: 0.5,
    //   includeBase64: true,
    // };
    // try {
    //   launchCamera(options, e => {
    //     // console.log(e.didCancel);
    //     setisImageModal(false);
    //     // console.log(e.assets[0]);
    //     !e.didCancel && setImageURI(e?.assets[0]);
    //     !e.didCancel && setImage(e?.assets[0]?.base64);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    // if(Platform.OS=="android"){
    //   const permissionAndroid = await PermissionsAndroid.check('android.permission.CAMERA');
    //   if(permissionAndroid != PermissionsAndroid.RESULTS.granted){
    //     const reqPer = await PermissionsAndroid.request('android.permission.CAMERA');
    //     if(reqPer != 'granted'){

    //     }
    //   }
    // }

    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
    }).then(image => {
      setisImageModal(false);
      // console.log(`data:${image.mime};base64,` + image.data);
      setImage(image.data);
      setImageType(image.mime);
    });
  };

  const onSumbit = () => {
    setLoading(true);
    console.log('Submit');
    let error = false;
    let nameErr = error.name;
    let emailErr = error.email;
    let phoneErr = error.phone;
    let imageErr = error.image;
    let displayErr = error.displayname;

    username === '' && (displayErr = true) && (error = true);

    let regexThree = /^[a-zA-Z0-9@_-]*$/;

    let regexPhone = /^[0-9]*$/;

    regexThree.test(username) === false &&
      (displayErr = true) &&
      (error = true);

    fullname === '' && (nameErr = true) && (error = true);

    let regexTwo = /^[a-zA-Z ]*$/;

    fullname != '' &&
      regexTwo.test(fullname) === false &&
      (nameErr = true) &&
      (error = true);

    console.log(regexTwo.test(fullname));

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    email != null &&
      reg.test(email) === false &&
      (emailErr = true) &&
      (error = true);

    // email === '' && (emailErr = true) && (error = true);

    phone === undefined && (phoneErr = true) && (error = true);
    regexPhone.test(phone) === false && (phoneErr = true) && (error = true);

    image === '' && (imageErr = true) && (error = true);
    image === '' &&
      Toast.show('Please select a profile picture.', Toast.LONG) &&
      (error = true);

    setError({
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      image: imageErr,
      displayname: displayErr,
    });

    error === true && setLoading(false);

    // console.log(imageURI);
    // console.log(`data:${imageType};base64,` + imageURI?.base64);

    let formdata = new FormData();

    formdata.append('email', email);
    formdata.append('full_name', fullname);
    formdata.append('user_name', username);
    formdata.append('mobile_no', phone);
    formdata.append('type', imageType);
    formdata.append('country_code', '+' + countryCode);
    formdata.append('profile_pic', `data:${imageURI?.type};base64,` + image);

    // const params = {
    //   email: email,
    //   full_name: fullname,
    //   mobile_no: phone,
    //   country_code: countryCode,
    //   profile_pic: image,
    // };

    fullname !== '' &&
      regexThree.test(username) === true &&
      regexTwo.test(fullname) === true &&
      // reg.test(email) === true &&
      phone !== undefined &&
      regexPhone.test(phone) === true &&
      image !== '' &&
      fetch(
        'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/register ',
        {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata,
        },
      )
        .then(response => response.json())
        .then(response => {
          setLoading(false);
          console.log(response);
          let error = 'Please check all the fields and try again.';
          !response?.success &&
            response?.errors?.full_name != undefined &&
            (error = response?.errors?.full_name[0]);
          !response?.success &&
            response?.errors?.mobile_no != undefined &&
            (error = response?.errors?.mobile_no[0]);
          !response?.success &&
            response?.errors?.user_name != undefined &&
            (error = response?.errors?.user_name[0]);
          !response?.success &&
            response?.errors?.profile_pic != undefined &&
            (error = response?.errors?.profile_pic[0]);
          !response?.success &&
            response?.errors?.type != undefined &&
            (error = response?.errors?.type[0]);
          !response?.success &&
            response?.errors?.type === undefined &&
            response?.errors?.profile_pic === undefined &&
            response?.errors?.user_name === undefined &&
            response?.errors?.mobile_no === undefined &&
            response?.errors?.full_name === undefined &&
            response?.message != undefined &&
            (error = response?.message);
          !response.success &&
            Alert.alert('Hold on!', error, [
              {
                text: 'okay',
                onPress: () => null,
                style: 'okay',
              },
            ]);
          response.success &&
            navigation.navigate('Otp', {
              details: {
                email: email,
                full_name: fullname,
                user_name: username,
                mobile_no: phone,
                type: imageType,
                country_code: '+' + countryCode,
                profile_pic: `data:${imageType};base64,` + imageURI?.base64,
              },
              userid: response.id,
              otp: response.otp,
              mobile_no: response.mobile_no,
              countryCode: countryCode,
              login: false,
            });
        });
    // .catch(error => {
    //   console.log(JSON.stringify(error));
    //   Toast.show('Mobile Number is Invalid', Toast.LONG);
    // });
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
        keyboardVerticalOffset={50}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          width: width,
          height: height,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView
          contentContainerStyle={[
            {
              width: width,
              height: height,
              alignItems: 'center',
            },
            // keyboard && {
            //   position: 'absolute',
            //   bottom: 0,
            // },
          ]}>
          <CustomHeader title={'Create Profile'} navigation={navigation} />
          <Text
            style={{
              width: (width * 85) / 100,
              fontSize: (height * 1.5) / 100,
              marginTop: (width * 5) / 100,
              textAlign: 'center',
              color: '#202020',
            }}>
            Provide your profile picture and display name to join the community
          </Text>
          {image === '' && (
            <Pressable
              onPress={() => setisImageModal(true)}
              style={{
                width: (height * 13) / 100,
                height: (height * 13) / 100,
                marginTop: (width * 5) / 100,
                backgroundColor: '#FFF0D3',
                borderRadius: (height * 15) / 100,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#9D9D9D',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: (height * 3) / 100,
                  height: (height * 3) / 100,
                  backgroundColor: '#F9AD19',
                  borderRadius: (height * 3) / 100,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather
                  size={(height * 2.3) / 100}
                  name="plus"
                  color={'white'}
                />
              </View>
              <Image
                source={require('../assets/images/camera.png')}
                style={{width: (height * 5) / 100, height: (height * 5) / 100}}
              />
            </Pressable>
          )}

          {image !== '' && (
            <Pressable
              onPress={() => setisImageModal(true)}
              style={{
                width: (height * 13) / 100,
                height: (height * 13) / 100,
                marginTop: (width * 5) / 100,
                backgroundColor: '#FFF0D3',
                borderRadius: (height * 15) / 100,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#9D9D9D',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: 'data:image/png;base64,' + image}}
                style={{
                  width: (height * 12) / 100,
                  height: (height * 12) / 100,
                  borderRadius: (height * 12) / 100,
                }}
              />
              <View
                style={{
                  width: (height * 3) / 100,
                  height: (height * 3) / 100,
                  backgroundColor: '#F9AD19',
                  borderRadius: (height * 3) / 100,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather
                  size={(height * 2.3) / 100}
                  name="plus"
                  color={'white'}
                />
              </View>
            </Pressable>
          )}

          <View style={[styles.loginSec, {marginTop: wp(5)}]}>
            {/**Display name */}
            {/**Display name */}
            <View
              style={{
                width: (width * 85) / 100,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: (width * 8) / 100,
              }}>
              <Feather
                size={(height * 2.3) / 100}
                name="user"
                color={'#F9AD19'}
              />
              <Text
                style={{
                  color: '#F9AD19',
                  fontSize: (height * 2) / 100,
                  marginLeft: (width * 2.5) / 100,
                }}>
                Display Name
              </Text>
            </View>
            <TextInput
              numberOfLines={1}
              placeholder={
                !error.displayname
                  ? 'Enter your display name.'
                  : 'Please enter a valid display name.'
              }
              style={[
                styles.textInput,
                {
                  marginLeft: (-width * 2.5) / 100,
                  marginTop: (width * 2.5) / 100,
                },
                error.displayname && {borderColor: 'red'},
              ]}
              value={username}
              onChangeText={val => setUsername(val)}
              maxLength={30}
            />
            {/**Display name */}
            {/**Display name */}

            {/**name */}
            {/**name */}
            <View
              style={{
                width: (width * 85) / 100,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: (width * 5) / 100,
              }}>
              <Feather
                size={(height * 2.3) / 100}
                name="user"
                color={'#F9AD19'}
              />
              <Text
                style={{
                  color: '#F9AD19',
                  fontSize: (height * 2) / 100,
                  marginLeft: (width * 2.5) / 100,
                }}>
                Full Name
              </Text>
            </View>
            <TextInput
              numberOfLines={1}
              placeholder={
                !error.name
                  ? 'Enter your full name'
                  : 'Please enter a valid name.'
              }
              style={[
                styles.textInput,
                {
                  marginLeft: (-width * 2.5) / 100,
                  marginTop: (width * 2.5) / 100,
                },
                error.name && {borderColor: 'red'},
              ]}
              value={fullname}
              onChangeText={val => setfullname(val)}
              maxLength={30}
            />
            {/**name */}
            {/**name */}

            {/**Email Id */}
            {/**Email Id */}

            <View
              style={{
                width: (width * 85) / 100,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: (height * 2.5) / 100,
              }}>
              <Feather
                size={(height * 2.3) / 100}
                name="mail"
                color={'#F9AD19'}
              />
              <Text
                style={{
                  color: '#F9AD19',
                  fontSize: (height * 2) / 100,
                  marginLeft: (width * 2.5) / 100,
                }}>
                Email ID
              </Text>
            </View>
            <TextInput
              numberOfLines={1}
              // onFocus={() => setkeyboard(true)}
              // onBlur={() => setkeyboard(false)}
              placeholder={
                !error.email
                  ? 'Enter your email id (Optional)'
                  : 'Enter a valid email'
              }
              style={[
                styles.textInput,
                {
                  marginLeft: (-width * 2.5) / 100,
                  marginTop: (width * 2.5) / 100,
                  marginBottom: (-height * 2.5) / 100,
                },
                error.email && {borderColor: 'red'},
              ]}
              value={email}
              onChangeText={val => setemail(val)}
              maxLength={35}
            />

            {/**Email Id */}
            {/**Email Id */}
            {/**phone */}
            {/**phone */}
            <MobileInput
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              phone={phone}
              setphone={setphone}
              error={error.phone}
              keyboard={setkeyboard}
            />

            {/**phone */}
            {/**phone */}

            {/*Next button and others */}
            {/*Next button and others */}
            <View
              style={{
                marginTop: (width * 5) / 100,
                width: (width * 85) / 100,
                // position: 'absolute',
                alignSelf: 'center',
                // bottom: 50,
              }}>
              <Pressable onPress={() => onSumbit()} style={styles.NXTButton}>
                <Text style={{color: 'white', fontSize: (height * 1.8) / 100}}>
                  NEXT
                </Text>
              </Pressable>
              <View
                style={{
                  //   width: (width * 85) / 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: (width * 5) / 100,
                }}>
                <Text
                  style={{
                    // width: (width * 85) / 100,
                    fontSize: (height * 1.8) / 100,
                    // marginTop: (height * 5) / 100,
                    marginRight: (width * 2.5) / 100,
                    textAlign: 'center',
                    color: '#202020',
                  }}>
                  I’m already a member ?
                </Text>
                <Pressable
                  onPress={() => navigation.navigate('Login')}
                  style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: (height * 1.8) / 100,
                      textAlign: 'center',
                      color: '#F9AD19',
                      fontWeight: 'bold',
                      marginRight: (width * 2.5) / 100,
                    }}>
                    Login
                  </Text>
                  <Feather
                    size={(height * 2.3) / 100}
                    name="arrow-right"
                    color={'#F9AD19'}
                  />
                </Pressable>
              </View>
            </View>
            {/*Next button and others */}
            {/*Next button and others */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal
        visible={isImageModal}
        title={'Please Select a Mathod to Upload Image'}
        onPress={() => {
          setisImageModal(false);
        }}>
        <TwoButton
          isLoading={false}
          leftLabel={'Gallery'}
          rightLabel={'Camera'}
          leftOnPress={() => {
            uploadGallery();
          }}
          rightOnPress={() => {
            uploadCamera();
          }}
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: (width * 85) / 100,
    height: (height * 5) / 100,
    marginLeft: (width * 5) / 100,
    backgroundColor: 'white',
    borderRadius: (height * 1) / 100,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    // flexDirection: 'row',
    paddingHorizontal: (width * 2.5) / 100,
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

export default SignUp;
