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
import CustomHeader from '../constants/header';
import {WebView} from 'react-native-webview';
import {wp, hp} from '../constants/styled';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Website = ({navigation, route}) => {
  const {url} = route?.params;
  const [loading, setLoading] = useState(false);

  //   console.log(event);

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
          title={'Web View'}
          //   backbutton={false}
          navigation={navigation}
        />

        <WebView
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          style={{height: height, width: width, backgroundColor: 'grey'}}
          source={{uri: url}}
        />
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

export default Website;
