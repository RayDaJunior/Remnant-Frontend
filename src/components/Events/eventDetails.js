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
import Hyperlink from 'react-native-hyperlink';

import Feather from 'react-native-vector-icons/Feather';
import {wp, hp} from '../../constants/styled';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EventDetails = ({navigation, route}) => {
  const {event} = route?.params;
  const [loading, setLoading] = useState(false);

  console.log(event);

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
          title={'Event Details'}
          //   backbutton={false}
          navigation={navigation}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: wp(85)}}>
          <FontAwesome name="calendar" size={hp(2)} color={'#F9AD19'} />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: hp(2),
              marginVertical: wp(5),
              marginHorizontal: wp(2.5),
            }}>
            Event Details:
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#FFF0D3',
            height: hp(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: wp(7.5),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: hp(2),
                fontWeight: 'bold',
                // marginTop: wp(2.5),
              }}>
              {event.event_date.substring(8, 10)}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: hp(2),
                fontWeight: 'bold',
                marginHorizontal: wp(0.5),
                // marginTop: wp(2.5),
              }}>
              {event?.event_date.substring(5, 7) === '01' && 'Jan'}
              {event?.event_date.substring(5, 7) === '02' && 'Feb'}
              {event?.event_date.substring(5, 7) === '03' && 'Mar'}
              {event?.event_date.substring(5, 7) === '04' && 'Apr'}
              {event?.event_date.substring(5, 7) === '05' && 'Jun'}
              {event?.event_date.substring(5, 7) === '06' && 'Jun'}
              {event?.event_date.substring(5, 7) === '07' && 'Jul'}
              {event?.event_date.substring(5, 7) === '08' && 'Aug'}
              {event?.event_date.substring(5, 7) === '09' && 'Sep'}
              {event?.event_date.substring(5, 7) === '10' && 'Oct'}
              {event?.event_date.substring(5, 7) === '11' && 'Nov'}
              {event?.event_date.substring(5, 7) === '12' && 'Dec'}
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: hp(2),
                // marginTop: wp(2.5),
              }}>
              {event.event_date.substring(0, 4)}
            </Text>
          </View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: hp(2),
              // marginTop: wp(2.5),
            }}>
            {event.event_time}
          </Text>
        </View>

        <View
          style={{
            marginVertical: wp(5),
            width: wp(85),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginRight: wp(2.5),
              width: wp(1.5),
              height: '100%',
              backgroundColor: '#F9AD19',
            }}></View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: hp(2.5),
              // marginTop: wp(2.5),
            }}>
            {event.event_name}
          </Text>
        </View>

        <Hyperlink
          linkStyle={{fontWeight: 'bold'}}
          onPress={(url, text) =>
            navigation.navigate('Website', {
              url: url,
            })
          }>
          <Text style={{fontSize: hp(2), width: wp(85)}}>
            {event.description}
          </Text>
        </Hyperlink>

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

export default EventDetails;
