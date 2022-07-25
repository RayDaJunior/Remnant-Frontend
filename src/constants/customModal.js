import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';
// import {wp, hp, Colors} from '../constant/colors';
import { wp, hp } from './styled';
// import {STYLES} from '../constant/commonStyle';

const CustomModal = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Pressable
          style={[styles.centeredView]}
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            }
          }}>
          <View
            onStartShouldSetResponder={() => true}
            style={[
              styles.modalView,
              {
                maxHeight: props.maxHeight ? props.maxHeight : hp(80),
                width: props.width ? props?.width : wp(80),
              },
            ]}>
            {props.title && (
              <Text style={styles.modalHeader}>{props?.title}</Text>
            )}
            <ScrollView
              scrollEnabled={props.scrollEnabled}
              bounces={false}
              showsVerticalScrollIndicator={props?.showsVerticalScrollIndicator}
              contentContainerStyle={{alignItems: 'center'}}>
              <Pressable
                style={{
                  width: props.width ? props?.width : wp(65),
                }}>
                {props.children}
              </Pressable>
            </ScrollView>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: wp(100),
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: hp(1),
    position: 'absolute',
    width: wp(85),
    maxHeight: hp(80),
    padding: hp(3),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalHeader: {
    // fontFamily: fonts.PSB,
    color: '#202020',
    fontSize: hp(2.5),
    textAlign: 'center',
    marginBottom: hp(1),
  },
  
});
