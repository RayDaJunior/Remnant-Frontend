import {ActivityIndicator, Pressable, Text, View} from 'react-native';
// import { Colors, fonts, hp, wp } from '../constant/colors';
import {wp, hp} from './styled';
// import { STYLES } from '../constant/commonStyle';
import React from 'react';
// import Ripple from 'react-native-material-ripple';
// import LinearGradient from 'react-native-linear-gradient';

const CustomButton = props => {
  if (props.isLoading) {
    return <ActivityIndicator size="large" color={Colors.darkBlue} />;
  }
  return (
    <View
      style={{
        flex: 1,
        height: hp(7),
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: hp(3),
      }}>
      <Pressable
        // rippleColor={'#F9AD19'}
        onPress={props.onPress}
        style={{
          //   borderWidth: 2,
          backgroundColor: '#F9AD19',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: hp(1),
          width: '47%',
        }}>
        <Text
          style={{
            // fontFamily: fonts.PSB,
            color: 'white',
            fontSize: hp(1.9),
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}>
          {props.label}
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;
