import React, {useEffect, useState} from 'react';
import {wp, hp} from '../constants/styled';
import {
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import CustomHeader from '../constants/header';
import CustomModal from '../constants/customModal';
import CustomButton from '../constants/customButton';

import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Contact = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setisFailed] = useState(false);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState({
    displayname: false,
    phone: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    username != '' && setError({...error, displayname: false});
  }, [username]);
  useEffect(() => {
    phone != undefined && setError({...error, phone: false});
  }, [phone]);
  useEffect(() => {
    email != '' && setError({...error, email: false});
  }, [email]);
  useEffect(() => {
    message != '' && setError({...error, message: false});
  }, [message]);

  const onSumbit = () => {
    console.log('clicked');

    setLoading(true);
    let nameErr = error.displayname;
    let phoneErr = error.phone;
    let emailErr = error.email;
    let messageErr = error.message;

    let errorFinal = false;

    console.log(errorFinal);
    // console.log(JSON.stringify(phone).length);

    username === '' && (nameErr = true) && (errorFinal = true);
    phone === undefined && (phoneErr = true) && (errorFinal = true);

    phone != undefined &&
      JSON.stringify(phone).length < 9 &&
      (phoneErr = true) &&
      (errorFinal = true);
    phone != undefined &&
      JSON.stringify(phone).length > 10 &&
      (phoneErr = true) &&
      (errorFinal = true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    reg.test(email) === false && (emailErr = true) && (errorFinal = true);

    message === '' && (messageErr = true) && (errorFinal = true);

    errorFinal === true && setLoading(false);

    setError({
      displayname: nameErr,
      phone: phoneErr,
      email: emailErr,
      message: messageErr,
    });

    !errorFinal &&
      fetch(
        'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/contact_us',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            contact_no: phone,
            email: email,
            message: message,
          }),
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setLoading(false);
          response.success ? setIsSuccess(true) : setisFailed(true);
        });

    // errorFinal = false;
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
        style={{width: '100%', alignItems: 'center'}}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{
            width: width,
            height: height,
            alignItems: 'center',
          }}>
          <CustomHeader title={'Contact Us'} navigation={navigation} />
          <Text
            style={{
              width: wp(85),
              fontSize: hp(1.5),
              marginTop: wp(5),
              textAlign: 'center',
              color: '#202020',
            }}>
            {
              'Reach out to us with any questions, issues, or tell us how much you love this app!'
            }
          </Text>

          {/**Display name */}
          {/**Display name */}
          <View
            style={{
              width: (width * 85) / 100,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: (height * 5) / 100,
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
              !error?.displayname
                ? 'Enter your display name.'
                : 'Please enter a valid display name.'
            }
            style={[
              styles.textInput,
              {
                marginLeft: (-width * 2.5) / 100,
                marginTop: (width * 2.5) / 100,
              },
              error?.displayname && {borderColor: 'red'},
            ]}
            value={username}
            onChangeText={val => setUsername(val)}
            maxLength={30}
          />
          {/**Display name */}
          {/**Display name */}

          {/**Contact No */}
          {/**Contact No */}
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
              Contact No
            </Text>
          </View>
          <TextInput
            numberOfLines={1}
            keyboardType="phone-pad"
            placeholder={
              !error.phone
                ? 'Enter your contact number.'
                : 'Please enter a valid contact number.'
            }
            style={[
              styles.textInput,
              {
                marginLeft: (-width * 2.5) / 100,
                marginTop: (width * 2.5) / 100,
              },
              error.phone && {borderColor: 'red'},
            ]}
            value={phone}
            onChangeText={val => setPhone(parseInt(val))}
            maxLength={30}
          />
          {/**Contact No */}
          {/**Contact No */}

          {/**Email */}
          {/**Email */}
          <View
            style={{
              width: (width * 85) / 100,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: (width * 5) / 100,
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
              Email
            </Text>
          </View>
          <TextInput
            numberOfLines={1}
            placeholder={
              !error.email ? 'Enter your email.' : 'Please enter a valid email.'
            }
            style={[
              styles.textInput,
              {
                marginLeft: (-width * 2.5) / 100,
                marginTop: (width * 2.5) / 100,
              },
              error.email && {borderColor: 'red'},
            ]}
            value={email}
            onChangeText={val => setEmail(val)}
            maxLength={30}
          />
          {/**Email*/}
          {/**Email*/}

          {/**Message */}
          {/**Message */}
          <View
            style={{
              width: (width * 85) / 100,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: (width * 5) / 100,
            }}>
            <Feather
              size={(height * 2.3) / 100}
              name="message-square"
              color={'#F9AD19'}
            />
            <Text
              style={{
                color: '#F9AD19',
                fontSize: (height * 2) / 100,
                marginLeft: (width * 2.5) / 100,
              }}>
              Message Us
            </Text>
          </View>
          <TextInput
            multiline={true}
            placeholder={
              !error.message
                ? 'Enter your message.'
                : 'Please enter a valid message.'
            }
            style={[
              styles.textInput,
              {
                textAlignVertical: 'top',
                height: hp(15),
                marginLeft: (-width * 2.5) / 100,
                marginTop: (width * 2.5) / 100,
              },
              error.message && {borderColor: 'red'},
            ]}
            value={message}
            onChangeText={val => setMessage(val)}
            maxLength={500}
          />
          {/**Message*/}
          {/**Message*/}

          <Pressable onPress={() => onSumbit()} style={styles.NXTButton}>
            <Text style={{color: 'white', fontSize: (height * 1.8) / 100}}>
              SUBMIT
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomModal
        visible={isSuccess}
        title={'Message sent successfully.'}
        onPress={() => null}>
        <CustomButton
          isLoading={false}
          label={'okay'}
          onPress={() => {
            setIsSuccess(false);
            navigation.goBack();
          }}
        />
      </CustomModal>
      <CustomModal
        visible={isFailed}
        title={"Couldn't procced the request."}
        onPress={() => {
          setisFailed(false);
        }}>
        <CustomButton
          isLoading={false}
          label={'okay'}
          onPress={() => {
            setisFailed(false);
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
  NXTButton: {
    width: (width * 85) / 100,
    height: (height * 5) / 100,
    backgroundColor: '#F9AD19',
    borderRadius: (height * 1) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (width * 5) / 100,
  },
});

export default Contact;
