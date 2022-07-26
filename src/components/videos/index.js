import React, { useEffect, useState } from "react";
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
} from "react-native";
import CustomHeader from "../../constants/header";
import CustomHeaderTwo from "../../constants/headerTwo";
import Footer from "../footer";
import MobileInput from "../../constants/mobileinput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UPDATE_PAGE } from "../../store/actions/actions";

import Feather from "react-native-vector-icons/Feather";
import { wp, hp } from "../../constants/styled";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Video = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState(1);
  const [videosArray, setVideosArray] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userDetails);
  // console.log(user, 'dahsboard');

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem("userToken");

    const header = {
      Authorization: `Bearer ${TOKEN}`,
    };

    console.log(TOKEN);

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/video_list`,
      {
        method: "POST",
        headers: header,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setVideosArray(result.data);
        // console.log(result.data);
      });
  };

  //events
  //events
  const renderItem = ({ item }) => {
    // console.log(user.user.id);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("VideoDetails", {
            id: item.id,
            userId: user.user.id,
          })
        }
        key={item.id}
        style={{
          marginHorizontal: wp(5),
          marginVertical: wp(5),
          width: wp(40),
          height: hp(18),
          // backgroundColor: 'rgba(0,0,0,0.2)'
        }}
      >
        {/* {console.log(item)} */}
        <Image
          loadingIndicatorSource={require("../../assets/images/default-video.png")}
          source={{ uri: item.video_thumbnail }}
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            resizeMode: "cover",
            width: "100%",
            flex: 1,
          }}
        />
        <FontAwesome5Icon
          style={{
            position: "absolute",
            alignSelf: "center",
            marginTop: hp(4),
          }}
          name={"play"}
          size={hp(5)}
          color={"white"}
        />

        <Text
          style={{ width: "100%", marginVertical: wp(2.5) }}
          numberOfLines={1}
        >
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
        <CustomHeader
          title={"Video"}
          backbutton={false}
          navigation={navigation}
        />

        <View style={{ flex: 1, paddingBottom: hp(5) }}>
          <FlatList
            ListFooterComponent={() => (
              <View style={{ widthL: "100%", height: hp(10) }}></View>
            )}
            numColumns={2}
            ListHeaderComponent={() => (
              <View
                style={{
                  width: wp(100),
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: wp(85),
                    height: hp(5),
                    marginVertical: wp(5),
                    backgroundColor: "#ECECEC",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: hp(5),
                      height: hp(5),
                      backgroundColor: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "black",
                    }}
                  >
                    <FontAwesome name="search" color={"white"} size={hp(3)} />
                  </View>
                  <TextInput
                    style={{ flex: 1, marginHorizontal: wp(2.5) }}
                    placeholder="Search videos"
                    val={searchTerm}
                    onChangeText={(val) => setSearchTerm(val)}
                  />
                </View>
                <View
                  style={{ flexDirection: "row", width: "100%", height: hp(7) }}
                >
                  <Pressable
                    onPress={() => setTab(1)}
                    style={[
                      {
                        width: "50%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      tab === 1
                        ? { backgroundColor: "#F9AD19" }
                        : { backgroundColor: "#D9D9D9" },
                    ]}
                  >
                    <Text style={{ fontSize: hp(1.8) }}>Learning Videos</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setTab(2)}
                    style={[
                      {
                        width: "50%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      tab === 2
                        ? { backgroundColor: "#F9AD19" }
                        : { backgroundColor: "#D9D9D9" },
                    ]}
                  >
                    <Text style={{ fontSize: hp(1.8) }}>Testimonies</Text>
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
          style={{ position: "absolute", bottom: hp(2) }}
        >
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

export default Video;
