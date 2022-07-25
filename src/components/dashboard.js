import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
} from "react-native";
import CustomHeader from "../constants/header";
import CustomHeaderTwo from "../constants/headerTwo";
import DashboardRender from "./dashboardRender";
import Footer from "./footer";
import MobileInput from "../constants/mobileinput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UPDATE_PAGE } from "../store/actions/actions";

import Feather from "react-native-vector-icons/Feather";
import { wp, hp } from "../constants/styled";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Dashboard = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState("1");
  const [phone, setphone] = useState();
  const [loading, setLoading] = useState(false);
  const [eventArray, setEventArray] = useState([]);
  const [notification, setNotification] = useState([]);
  const [userId, setUserId] = useState();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   userId != undefined && getNotification(userId);
  // }, [userId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserDetails();
      // getNotification(userId);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getDashboard();
    getUserDetails();
  }, []);

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const updateNotification = () => {
    userId != undefined && getNotification(userId);
  };

  const getNotification = async (id) => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem("userToken");
    // console.log(userId);

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/get_notification`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          id: id,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        // console.log(result);
        setNotification(result.data);
        // console.log(result);
      });
  };

  const getUserDetails = async () => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem("userToken");

    const header = {
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/user_details`,
      {
        method: "POST",
        headers: header,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        // console.log(result[0].id);
        setUserId(result[0].id);
        getNotification(result[0].id);
      });
  };

  const getDashboard =async ()=>{
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem("userToken");

    const header = {
      Authorization: `Bearer ${TOKEN}`,
    };

    console.log(TOKEN);

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/get_all_details`,
      {
        method: "POST",
        headers: header,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setEventArray(result.data);
        // console.log(result.data);
      });
  }

  const getEvents = async () => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem("userToken");

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    console.log(TOKEN);

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/events`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          status: 0,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        // setEventArray(result.data);
        // console.log(result);
      });
  };

  const renderDashboard = ({ item }) => {
    return <DashboardRender item={item} navigation={navigation}/>;
  };

  //events
  //events
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("EventDetails", {
            event: item,
          })
        }
        style={{
          width: wp(85),
          paddingVertical: wp(2.5),
          paddingHorizontal: wp(5),
          backgroundColor: "rgba(0,0,0,0.08)",
          // borderRadius: hp(1),
          // marginTop: wp(5),
          marginBottom: wp(5),
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        {/**calendar */}
        {/**calendar */}
        {/**calendar */}
        <View style={{ alignSelf: "center" }}>
          <View
            style={{
              height: hp(15),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Image
              source={require('../assets/images/calendar-solid.png')}
              style={{
                width: hp(5),
                height: hp(5),
                opacity: 0.3,
              }}
            /> */}
            <Text
              style={{
                fontSize: hp(4),
                color: "#F9AD19",
                fontWeight: "bold",
                // position: 'absolute',
                // top: hp(3.5),
              }}
            >
              {item?.event_date.substring(8, 10)}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "rgba(0,0,0,0.5)",
                  fontSize: hp(1.5),
                  // marginTop: wp(2.5),
                }}
              >
                {item?.event_date.substring(5, 7) === "01" && "Jan"}
                {item?.event_date.substring(5, 7) === "02" && "Feb"}
                {item?.event_date.substring(5, 7) === "03" && "Mar"}
                {item?.event_date.substring(5, 7) === "04" && "Apr"}
                {item?.event_date.substring(5, 7) === "05" && "Jun"}
                {item?.event_date.substring(5, 7) === "06" && "Jun"}
                {item?.event_date.substring(5, 7) === "07" && "Jul"}
                {item?.event_date.substring(5, 7) === "08" && "Aug"}
                {item?.event_date.substring(5, 7) === "09" && "Sep"}
                {item?.event_date.substring(5, 7) === "10" && "Oct"}
                {item?.event_date.substring(5, 7) === "11" && "Nov"}
                {item?.event_date.substring(5, 7) === "12" && "Dec"}
              </Text>
              <Text
                style={{
                  color: "rgba(0,0,0,0.5)",
                  fontSize: hp(1.5),
                  marginHorizontal: wp(0.5),
                }}
              >
                {item?.event_date.substring(0, 4)}
              </Text>
            </View>

            <Text
              style={{
                color: "rgba(0,0,0,0.5)",
                fontSize: hp(2),
                marginTop: wp(0.5),
                fontWeight: "bold",
              }}
            >
              {item?.event_time}
            </Text>

            <View
              style={{
                width: hp(3),
                height: hp(3),
                backgroundColor: "#F9AD19",
                borderRadius: hp(3),
                marginVertical: wp(2.5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="angle-right" color={"black"} size={hp(2.5)} />
            </View>
          </View>
        </View>
        {/**calendar */}
        {/**calendar */}
        {/**calendar */}
        <View
          style={{
            width: wp(1),
            height: "100%",
            backgroundColor: "#F9AD19",
            marginHorizontal: wp(5),
          }}
        ></View>
        {/**Data */}
        {/**Data */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: hp(1.8),
              color: "black",
              fontWeight: "bold",
              marginBottom: wp(2.5),
            }}
          >
            {item.event_name}
          </Text>
          <Text
            numberOfLines={5}
            style={{
              fontSize: hp(1.8),
              color: "black",
              marginBottom: wp(2.5),
            }}
          >
            {item.description}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(1.5),
              fontWeight: "bold",
              color: "black",
            }}
          >
            Read more...
          </Text>
        </View>
        {/**Data */}
        {/**Data */}
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
            position: "absolute",
            width: wp(100),
            height: hp(100),
            top: 0,
            left: 0,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1,
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )}
      <View
        style={{
          width: width,
          height: height,
          // justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <CustomHeaderTwo
          title={"Home"}
          updateNotification={updateNotification}
          backbutton={false}
          navigation={navigation}
          notification={notification}
          notificationCount={
            notification?.filter((i) => i.notification_seen === 0).length
          }
        />

        <View style={{ flex: 1, paddingBottom: hp(10) }}>
          <FlatList
            ListFooterComponent={()=>(
              <View style={{width: '100%', height: hp(8)}}></View>
            )}
            style={{paddingTop: wp(5)}}
            data={eventArray}
            renderItem={renderDashboard}
            keyExtractor={(item, index) => index}
          />
        </View>

        <View
          // style={{marginTop: -hp(10)}}
          style={{ position: "absolute", bottom: hp(2) }}
        >
          <Footer navigation={navigation} selected={1} />
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
    backgroundColor: "#ECECEC",
    alignItems: "center",
  },
  NXTButton: {
    width: (width * 85) / 100,
    height: (height * 5) / 100,
    backgroundColor: "#F9AD19",
    borderRadius: (height * 1) / 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (width * 2.5) / 100,
  },
});

export default Dashboard;
