import React, {useState, useEffect, useMemo} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CountryCodes from './countyCode';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MobileInput = props => {
  const [flag, setFlag] = useState(
    'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/public/country/United States.png',
  );
  const [countries, setCountries] = useState([]);
  const [country, setcountry] = useState(false);

  // useEffect(()=>{
  //   console.log(props.phone);
  // }, [props.phone])
  

  useEffect(() => {
    fetchCOuntries;
  }, []);

  const fetchCOuntries = useMemo(() => {
    fetch(
      'http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/get_country_flag',
      {
        method: 'POST',
      },
    )
      .then(res => res.json())
      .then(results => {
        // console.log(results);
        setCountries(results);
      });
  }, []);

  return (
    <>
      {/* Mobile Number */}
      {/* Mobile Number */}
      <View
        style={{
          width: (width * 85) / 100,
          flexDirection: 'row',
          marginTop: (height * 5) / 100,
        }}>
        <Feather
          size={(height * 2.3) / 100}
          name="smartphone"
          color={'#F9AD19'}
        />
        <Text
          style={{
            color: '#F9AD19',
            fontSize: (height * 2) / 100,
            marginLeft: (width * 2.5) / 100,
          }}>
          Mobile Number
        </Text>
      </View>
      {/* Mobile Number */}
      {/* Mobile Number */}
      {/**Text Input */}
      {/**Text Input */}
      <View
        style={{
          width: (width * 85) / 100,
          flexDirection: 'row',
          marginTop: (height * 2) / 100,
        }}>
        <Pressable
          style={styles.countryDropDown}
          onPress={() => {
            setcountry(true);
            props?.keyboard !== undefined && props?.keyboard(false);
          }}>
          <Image
            source={{uri: flag}}
            style={{
              marginRight: (width * 2.5) / 100,
              height: (height * 2.2) / 100,
              width: (height * 3.5) / 100,
            }}
          />
          <Text
            style={{
              fontSize: (height * 2) / 100,
              marginRight: (width * 2.5) / 100,
            }}>
            {'+'}
            {props.countryCode}
          </Text>
          <Feather
            size={(height * 1.8) / 100}
            name="chevron-down"
            color={'#626262'}
          />
        </Pressable>
        <TextInput
          numberOfLines={1}
          // onFocus={() => {props?.keyboard !=undefined && props?.keyboard(true)}}
          // onBlur={() => {props?.keyboard !=undefined && props?.keyboard(false)}}
          // keyboardType="phone-pad"
          placeholder="Enter your phone number"
          style={[styles.phoneInput, props.error && {borderColor: 'red'}]}
          value={props.phone}
          onChangeText={val => props.setphone(val)}
          maxLength={15}
        />
      </View>
      {/**Text Input */}
      {/**Text Input */}

      {/**country dropdown */}
      {/**country dropdown */}
      {country && (
        <CountryCodes
          countries={countries}
          setCountryCode={props.setCountryCode}
          setcountry={setcountry}
          setFlag={setFlag}
          keyboard={props?.keyboard}
        />
      )}
      {/**country dropdown */}
      {/**country dropdown */}
    </>
  );
};

const styles = StyleSheet.create({
  countryDropDown: {
    paddingHorizontal: (width * 2.5) / 100,
    height: (height * 5) / 100,
    backgroundColor: 'white',
    borderRadius: (height * 1) / 100,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    flexDirection: 'row',
    alignItems: 'center',
  },

  phoneInput: {
    flex: 1,
    height: (height * 5) / 100,
    marginLeft: (width * 5) / 100,
    backgroundColor: 'white',
    borderRadius: (height * 1) / 100,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    flexDirection: 'row',
    paddingHorizontal: (width * 2.5) / 100,
  },
});

export default MobileInput;
