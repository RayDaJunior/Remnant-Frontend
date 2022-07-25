import React from 'react';
import {Dimensions, View, Text, StyleSheet, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wp, hp} from './styled';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CustomHeaderTwo = (props, {navigation}) => {
  return (
    <>
      <View style={styles.header}>
        <Pressable
          style={{
            // width: hp(4.5),
            // height: hp(4.5),
            // borderRadius: hp(4),
            // backgroundColor: 'white',
            // justifyContent: 'center',
            // alignItems: 'center',
            marginHorizontal: wp(5),
          }}
          onPress={() => null}>
          <FontAwesome
            size={(height * 3) / 100}
            name="bars"
            color={'white'}
            // style={styles.backicn}
          />
        </Pressable>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginHorizontal: wp(5),
          }}>
          <Pressable
            style={{
              marginHorizontal: wp(1),
            }}
            onPress={() =>
              props?.navigation?.navigate('Notification', {
                notification: props.notification,
                updateNotification: props.updateNotification
              })
            }>
            {props.notificationCount > 0 && (
              <View
                style={{
                  paddingHorizontal: hp(0.6),
                  paddingVertical: hp(0.2),
                  backgroundColor: 'black',
                  borderRadius: hp(1.5),
                  position: 'absolute',
                  zIndex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp(1), color: 'white'}}>
                  {props.notificationCount < 9 ? props.notificationCount : '9+'}
                </Text>
              </View>
            )}
            <FontAwesome
              size={(height * 3) / 100}
              name="bell"
              color={'white'}
              // style={styles.backicn}
            />
          </Pressable>
          <Pressable
            style={{
              // width: hp(4.5),
              // height: hp(4.5),
              // borderRadius: hp(4),
              // backgroundColor: 'white',
              // justifyContent: 'center',
              // alignItems: 'center',
              marginHorizontal: wp(1),
            }}
            onPress={() => null}>
            <MaterialCommunityIcons
              size={(height * 4) / 100}
              name="account-circle"
              color={'white'}
              // style={styles.backicn}
            />
          </Pressable>
        </View>
      </View>
      <Text style={styles.title}>{props?.title}</Text>
    </>
  );
};

CustomHeaderTwo.defaultProps = {
  backbutton: true,
  notificationCount: 0,
  notification: [],
  updateNotification: null
};

const styles = StyleSheet.create({
  backicn: {
    // width: (height * 5) / 100,
    // height: (height * 5) / 100,
    marginLeft: (width * 2.5) / 100,
  },
  header: {
    width: width,
    height: (height * 8) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9AD19',
    justifyContent: 'space-between',
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#161212',
    fontSize: (height * 2.3) / 100,
    lineHeight: (height * 8) / 100,
    fontWeight: 'bold',
  },
});

export default CustomHeaderTwo;
