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
import {UPDATE_PAGE} from '../../store/actions/actions';

import Feather from 'react-native-vector-icons/Feather';
import {wp, hp} from '../../constants/styled';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Video = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState(1);
  const [videosArray, setVideosArray] = useState([
    {
      id: 1,
      thumbnail:
        'https://images.pexels.com/photos/3876332/pexels-photo-3876332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'A Random Title',
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      thumbnail:
        'https://images.pexels.com/photos/3876332/pexels-photo-3876332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'A Random Title',
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 3,
      thumbnail:
        'https://images.pexels.com/photos/3876332/pexels-photo-3876332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'A Random Title',
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 4,
      thumbnail:
        'https://images.pexels.com/photos/3876332/pexels-photo-3876332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'A Random Title',
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    // getVideos();
  }, []);

  const getVideos = async () => {
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
        setVideosArray(result.data);
        // console.log(result.data);
      });
  };

  //events
  //events
  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('VideoDetails', {
            item,
          })
        }
        key={item.id}
        style={{
          marginHorizontal: wp(5),
          marginVertical: wp(5),
          width: wp(40),
          height: hp(20),
          // backgroundColor: 'rgba(0,0,0,0.2)'
        }}>
        {/* {console.log(item)} */}
        <Image
          loadingIndicatorSource={require('../../assets/images/default-video.png')}
          source={{uri: item.thumbnail}}
          style={{resizeMode: 'cover', width: '100%', flex: 1}}
        />
        <Text
          style={{width: '100%', marginVertical: wp(2.5)}}
          numberOfLines={1}>
          {item.title}
        </Text>
      </Pressable>
    );
  };
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
          title={'Video'}
          backbutton={false}
          navigation={navigation}
        />

        <View style={{flex: 1, paddingBottom: hp(10)}}>
          <FlatList
            numColumns={2}
            ListHeaderComponent={() => (
              <View
                style={{
                  width: wp(100),
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: wp(85),
                    height: hp(5),
                    marginVertical: wp(5),
                    backgroundColor: '#ECECEC',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: hp(5),
                      height: hp(5),
                      backgroundColor: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'black',
                    }}>
                    <FontAwesome name="search" color={'white'} size={hp(3)} />
                  </View>
                  <TextInput
                    style={{flex: 1, marginHorizontal: wp(2.5)}}
                    placeholder="Search videos"
                    val={searchTerm}
                    onChangeText={val => setSearchTerm(val)}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', width: '100%', height: hp(7)}}>
                  <Pressable
                    onPress={() => setTab(1)}
                    style={[
                      {
                        width: '50%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      tab === 1
                        ? {backgroundColor: '#F9AD19'}
                        : {backgroundColor: '#D9D9D9'},
                    ]}>
                    <Text style={{fontSize: hp(1.8)}}>Learning Videos</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setTab(2)}
                    style={[
                      {
                        width: '50%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      tab === 2
                        ? {backgroundColor: '#F9AD19'}
                        : {backgroundColor: '#D9D9D9'},
                    ]}>
                    <Text style={{fontSize: hp(1.8)}}>Testimonies</Text>
                  </Pressable>
                </View>
              </View>
            )}
            data={videosArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>

        <View
          // style={{marginTop: -hp(10)}}
          style={{position: 'absolute', bottom: hp(2)}}>
          <Footer navigation={navigation} selected={2} />
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

export default Video;
