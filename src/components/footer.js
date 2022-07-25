import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text, StyleSheet, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wp, hp} from '../constants/styled';

import {useSelector, useDispatch} from 'react-redux';
import {UPDATE_PAGE} from '../store/actions/actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Footer = (props, {navigation}) => {
  const [items, setitems] = useState([
    {id: 1, navigate: 'Dashboard', icon: 'home', title: 'Home'},
    {id: 2, navigate: 'Video', icon: 'video', title: 'Video'},
    {id: 3, navigate: 'Tribes', icon: 'users', title: 'Tribes'},
    {id: 4, navigate: 'Chats', icon: 'message-circle', title: 'Chats'},
    {id: 5, navigate: 'Calendar', icon: 'calendar', title: 'Calendar'},
    {id: 6, navigate: 'Live', icon: 'tv', title: 'Live Videos'},
    {id: 7, navigate: 'Donate', icon: 'hand-holding-medical', title: 'Donate'},
  ]);

  const pageno = useSelector(state => state.pageno);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(pageno.pageno);
  }, []);
  return (
    <View style={styles.footer}>
      <View style={styles.footerOne}>
        {items
          .filter(i => i.id < 4)
          .map(item => (
            <Pressable
              onPress={() => {
                props.navigation.navigate(item.navigate);
                dispatch(UPDATE_PAGE(item.id));
              }}
              key={item.id}
              style={[
                {alignItems: 'center', marginTop: hp(3)},
                
              ]}>
              {item.id != 7 && (
                <Feather
                  name={item.icon}
                  size={hp(3)}
                  color={props.selected === item.id ? 'white' : '#FFA800'}
                />
              )}
             

              <Text
                style={[
                  {fontSize: hp(1.2), color: '#FFA800'},
                  props.selected === item.id && {color: 'white'},
                ]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
      </View>
      <View style={styles.footerTwo}>
        {items
          .filter(i => i.id >3 )
          .map(item => (
            <Pressable
              onPress={() => {
                props.navigation.navigate(item.navigate);
                dispatch(UPDATE_PAGE(item.id));
              }}
              key={item.id}
              style={[
                {alignItems: 'center', marginTop: hp(3)},
                item.id === 7 && {
                  width: hp(8),
                  height: hp(8),
                  position: 'absolute',
                  left: -hp(7),
                  transform: [ {translateY: -hp(4)}],
                  alignSelf: 'center',
                  backgroundColor: 'black',
                  borderRadius: hp(5),
                  borderWidth: hp(1),
                  borderColor: '#eeeded',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              {item.id != 7 && (
                <Feather
                  name={item.icon}
                  size={hp(3)}
                  color={props.selected === item.id ? 'white' : '#FFA800'}
                />
              )}
              {item.id === 7 && (
                <FontAwesome5
                  name={item.icon}
                  size={hp(2.5)}
                  color={props.selected === item.id ? 'white' : '#FFA800'}
                />
              )}

              <Text
                style={[
                  {fontSize: hp(1.2), color: '#FFA800'},
                  props.selected === item.id && {color: 'white'},
                ]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
      </View>
    </View>
  );
};

Footer.defaultProps = {
  backbutton: true,
};

const styles = StyleSheet.create({
  footerOne: {
    marginLeft: wp(5),
    width: wp(38),
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerTwo: {
    marginRight: wp(5),
    width: wp(38),
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    width: width,
    height: (height * 8) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    marginBottom: hp(1)
  },
});

export default Footer;
