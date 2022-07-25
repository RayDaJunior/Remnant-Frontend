import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {wp, hp} from './styled';
import {useDebounce} from 'use-debounce';

const CountryCodes = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [value] = useDebounce(searchTerm, 1000);
  const [array, setarray] = useState(props?.countries);

  //   console.log(props?.countries);

  useEffect(() => {
    // console.log(props.countries);
    // console.log(value);
    searchTerm == '' && setarray(props?.countries);
    // let newarray = [];
    let newarray = props?.countries.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    // newarray = array?.includes(i => {
    //   return i.nicename === value;
    // });
    // console.log(newarray);
    searchTerm != '' && setarray(newarray);
  }, [value]);

  return (
    <View
      style={{
        width: wp(100),
        height: hp(100),
        position: 'absolute',
        left: 0,
        top: -hp(33),
        zIndex: 1,
      }}>
      <View
        style={{
          width: '100%',
          height: hp(15),
          backgroundColor: 'black',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: hp(2.5), color: 'white', marginTop: wp(5)}}>
          Select Country
        </Text>
        <TextInput
          numberOfLines={1}
          style={styles.searchbar}
          placeholder={'Search...'}
          value={searchTerm}
          onChangeText={val => setSearchTerm(val)}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: wp(100),
          backgroundColor: '#FFF0D3',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {array?.length > 0 ? (
          <View
            style={{
              width: wp(85),
              height: hp(75),
              backgroundColor: '#FFFFFF',
              // marginTop: hp(2.5),
            }}>
            <FlatList
              contentContainerStyle={{
                width: '100%',
              }}
              data={array}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() => {
                    props?.setCountryCode(item.phonecode);
                    props?.setcountry(false);
                    props?.setFlag(item.image);
                    props?.keyboard != undefined && props?.keyboard(true);
                  }}
                  style={{
                    width: '100%',
                    paddingVertical: wp(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  key={index}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      marginLeft: wp(5),
                      height: hp(2.8),
                      width: hp(4),
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      maxWidth: wp(50),
                      marginLeft: wp(2.5),
                      color: 'black',
                      fontSize: hp(2),
                    }}>
                    {item.nicename}
                    {' ('}
                    {item.iso3}
                    {')'}
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp(2.5),
                      color: 'black',
                      fontSize: hp(2),
                      position: 'absolute',
                      right: wp(5),
                    }}>
                    {'+'}
                    {item.phonecode}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        ) : (
          <Text>No results found.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    width: wp(85),
    height: hp(5),
    borderRadius: hp(5),
    backgroundColor: '#C4C4C4',
    marginTop: wp(2.5),
    paddingHorizontal: wp(5),
  },
});

export default CountryCodes;
