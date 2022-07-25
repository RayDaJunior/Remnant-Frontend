import React from 'react';
import {Dimensions, View, Text, StyleSheet, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CustomHeader = (props, {navigation}) => {
  return (
    <>
      <View style={styles.header}>
        {props?.backbutton && (
          <Pressable onPress={() => props?.navigation?.goBack()}>
            <Feather
              size={(height * 3) / 100}
              name="chevron-left"
              color={'#161212'}
              style={styles.backicn}
            />
          </Pressable>
        )}
      </View>
      <Text style={styles.title}>{props?.title}</Text>
    </>
  );
};

CustomHeader.defaultProps = {
    backbutton: true
}

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

export default CustomHeader;
