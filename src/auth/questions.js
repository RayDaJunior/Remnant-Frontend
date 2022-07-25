import React, {useEffect, useState} from 'react';
import {wp, hp} from '../constants/styled';
import {
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import CustomHeader from '../constants/header';

import Feather from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Questions = ({navigation, route}) => {
  const {userid} = route?.params;
  const [loading, setLoading] = useState(false);
  const [gender, setgender] = useState('Male');
  const [questions, setquestions] = useState([
    {id: 1, question: 'Are you Born Again?', value: 1},
    {id: 2, question: 'Do you need help understanding your dreams?', value: 1},
    {id: 3, question: 'Do you need Prayer?', value: 1},
    {
      id: 4,
      question:
        'Do you have questions about the FATHER, SON (JESUS), and HOLY SPIRIT?',
      value: 1,
    },
    {id: 5, question: 'Did you attend a recent WeRemnant event?', value: 1},
    {id: 6, question: 'Are you baptized with the HOLY SPIRIT?', value: 1},
  ]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.navigate('Dashboard')},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const setRadio = (id, val) => {
    let myArray = [...questions];
    let objIndex = myArray.findIndex(obj => obj.id == id);

    // console.log(myArray[objIndex]);

    myArray[objIndex].value = val;
    // myArray[objIndex].question = 'whatever';

    setquestions(myArray);
  };

  const onSumbit = () => {
    console.log(questions[5].value);
    setLoading(true);
    fetch(
      'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/other_details',
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userid,
          beliver: questions[0].value,
          dreams: questions[1].value,
          prayer: questions[2].value,
          question: questions[3].value,
          event: questions[4].value,
          holy_spirit: questions[5].value,
          gender: gender === 'Male' ? 1 : 2,
        }),
      },
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setLoading(false);
        response.success && navigation.navigate('Dashboard');
      });
  };

  return (
    <View style={{width: wp(100), alignItems: 'center'}}>
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
      <CustomHeader title={'Answer These Questions'} navigation={navigation} />
      <Text
        style={{
          width: wp(85),
          fontSize: hp(1.5),
          marginTop: wp(5),
          textAlign: 'center',
          color: '#202020',
        }}>
        {'To recommend Tribes for you, please answer these questions.'}
      </Text>
      {/**Questions */}
      {/**Questions */}
      <ScrollView
        style={{
          marginTop: wp(5),
          width: wp(85),
          height: hp(65),
        }}>
        <View style={styles.questionContainer}>
          <Text
            style={{
              width: wp(75),
              color: 'black',
              fontSize: hp(2),
              fontWeight: 'bold',
            }}>
            Are you male or female?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: wp(2.5),
            }}>
            <Pressable
              onPress={() => setgender('Male')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: wp(5),
              }}>
              <Text style={{fontSize: hp(2), color: 'black'}}>Male</Text>
              <View style={styles.radio}>
                {gender == 'Male' && (
                  <View
                    style={{
                      width: hp(2),
                      height: hp(2),
                      borderRadius: hp(3),
                      backgroundColor: '#F9AD19',
                    }}></View>
                )}
              </View>
            </Pressable>

            <Pressable
              onPress={() => setgender('Female')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: wp(5),
              }}>
              <Text style={{fontSize: hp(2), color: 'black'}}>Female</Text>
              <View style={styles.radio}>
                {gender !== 'Male' && (
                  <View
                    style={{
                      width: hp(2),
                      height: hp(2),
                      borderRadius: hp(3),
                      backgroundColor: '#F9AD19',
                    }}></View>
                )}
              </View>
            </Pressable>
          </View>
        </View>

        {questions.map((item, index) => {
          return (
            <View style={styles.questionContainer} key={item.id}>
              <Text
                style={{
                  width: wp(75),
                  color: 'black',
                  fontSize: hp(2),
                  fontWeight: 'bold',
                }}>
                {item.question}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: wp(2.5),
                }}>
                <Pressable
                  onPress={() => setRadio(item.id, 1)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: wp(5),
                  }}>
                  <Text style={{fontSize: hp(2), color: 'black'}}>Yes</Text>
                  <View style={styles.radio}>
                    {item.value == 1 && (
                      <View
                        style={{
                          width: hp(2),
                          height: hp(2),
                          borderRadius: hp(3),
                          backgroundColor: '#F9AD19',
                        }}></View>
                    )}
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setRadio(item.id, 0)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: wp(5),
                  }}>
                  <Text style={{fontSize: hp(2), color: 'black'}}>No</Text>
                  <View style={styles.radio}>
                    {item.value !== 1 && (
                      <View
                        style={{
                          width: hp(2),
                          height: hp(2),
                          borderRadius: hp(3),
                          backgroundColor: '#F9AD19',
                        }}></View>
                    )}
                  </View>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
      {/**Questions */}
      {/**Questions */}

      <Pressable onPress={() => onSumbit()} style={styles.NXTButton}>
        <Text style={{color: 'white', fontSize: (height * 1.8) / 100}}>
          SUBMIT
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Dashboard')}
        style={{flexDirection: 'row', marginTop: wp(2.5)}}>
        <Text
          style={{
            fontSize: (height * 1.8) / 100,
            textAlign: 'center',
            color: '#F9AD19',
            fontWeight: 'bold',
            marginRight: (width * 2.5) / 100,
          }}>
          Skip
        </Text>
        <Feather
          size={(height * 2.3) / 100}
          name="arrow-right"
          color={'#F9AD19'}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    width: hp(3),
    height: hp(3),
    borderRadius: hp(3),
    borderWidth: hp(0.2),
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2.5),
  },
  questionContainer: {
    width: wp(85),
    paddingVertical: wp(5),
    paddingHorizontal: wp(5),
    borderRadius: hp(1),
    backgroundColor: '#ECECEC',
    marginBottom: wp(2.5),
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

export default Questions;
