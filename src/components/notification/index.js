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
  TouchableOpacity,
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

const Notification = ({navigation, route}) => {
  const {notification} = route.params;
  const [notificationNow, setNotificationNow] = useState(notification);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(notification[0]?.user_id);
  useEffect(() => {
    // console.log(userId);
    const notificationSeen = async () => {
      setLoading(true);
      const TOKEN = await AsyncStorage.getItem('userToken');
      // console.log(userId);

      const header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      };

      await fetch(
        `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/notification_seen`,
        {
          method: 'POST',
          headers: header,
          body: JSON.stringify({
            id: userId,
          }),
        },
      )
        .then(res => res.json())
        .then(result => {
          setLoading(false);
          console.log(result);
          // updateNotification(userId);
          // setNotification(result.data);
          // console.log(result);
        });
    };
    notification.filter(i => i.notification_seen === 0).length > 0 &&
      notificationSeen();
  }, []);

  const getNotification = async () => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem('userToken');
    // console.log(userId);

    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/get_notification`,
      {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          id: userId,
        }),
      },
    )
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        console.log(result);
        setNotificationNow(result.data);
        // console.log(result);
      });
  };

  const deleteNotification = async id => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem('userToken');
    // console.log(userId);

    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/notification_delete`,
      {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          id: id,
          user_id: userId,
        }),
      },
    )
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        console.log(result);
        getNotification();
        // updateNotification(userId);
        // setNotificationNow(result.data);
        // console.log(result);
      });
  };

  const renderNotification = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: wp(85),
          // paddingHorizontal: wp(5),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.05)',
          marginVertical: wp(2.5),
        }}>
        <Text
          style={{
            color: '#F9AD19',
            fontSize: hp(1.5),
            position: 'absolute',
            right: wp(5),
            top: wp(2.5),
          }}>
          {item.updated_at.substring(11, 16)}
        </Text>
        <View
          style={{
            width: wp(1),
            height: '100%',
            minHeight: hp(5),
            backgroundColor: '#F9AD19',
          }}></View>
        <View
          style={{
            width: hp(5),
            height: hp(5),
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp(5),
            borderRadius: hp(5),
            marginVertical: wp(5),
          }}>
          {/* {console.log(item)} */}
          {item.notification_type === 'event' && (
            <FontAwesome name={'calendar'} size={hp(2.5)} color={'white'} />
          )}
        </View>
        <View
          style={{
            marginRight: wp(5),
            flex: 1,
            height: '100%',
            paddingVertical: wp(5),
          }}>
          {item.notification_type === 'event' && (
            <Text style={{fontSize: hp(2), color: 'black', fontWeight: 'bold'}}>
              New event added.
            </Text>
          )}
          {console.log(item)}
          <Text style={{fontSize: hp(1.8)}} numberOfLines={4}>
            <Text>{item.notification_title}</Text>
            {item.notification_description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteNotification(item.id)}
          style={{alignSelf: 'center', marginRight: wp(5)}}>
          <FontAwesome5 name="trash" size={hp(2)} color={'#F9AD19'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
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
          title={'Notification'}
          //   backbutton={false}
          navigation={navigation}
        />
        {notification.length > 0 && (
          <View style={{flex: 1}}>
            {/* {console.log(notification)} */}
            <FlatList
              style={{marginTop: wp(2.5)}}
              data={notificationNow}
              renderItem={renderNotification}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
        {notification.length === 0 && (
          <Text style={{marginTop: wp(10)}}>No new notifications.</Text>
        )}

        {/* <View
          // style={{marginTop: -hp(10)}}
          style={{position: 'absolute', bottom: hp(2)}}>
          <Footer navigation={navigation} />
        </View> */}
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

export default Notification;
