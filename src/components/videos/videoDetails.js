import React, { useEffect, useState, useCallback } from "react";
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
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import CustomHeader from "../../constants/header";
import CustomHeaderTwo from "../../constants/headerTwo";
import Footer from "../footer";
import RenderComment from "./renderComments";
import TwoButton from "../../constants/twoButton";
import CustomModal from "../../constants/customModal";
import MobileInput from "../../constants/mobileinput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import YoutubePlayer from "react-native-youtube-iframe";

import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UPDATE_PAGE } from "../../store/actions/actions";

import Feather from "react-native-vector-icons/Feather";
import { wp, hp } from "../../constants/styled";
import VideoPlayer from "react-native-video-controls";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const VideoDetails = ({ navigation, route }) => {
  const { item, id, userId } = route.params;
  const [video, setVideo] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState(false);
  const [fullDes, setFullDes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [textHeight, setTextHeight] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(1);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getVideoDetails();
    getCOmments();
    setError(false);
    setKey(key + 1);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getVideoDetails();
    getCOmments();
  }, []);

  const getVideoDetails = async () => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem("userToken");
    // console.log(userId);

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/video_description`,
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
        // console.warn(result, "==des");
        setVideo(result.data);
        // console.log(result);
      });
  };

  const getCOmments = async () => {
    setLoading(true);
    const TOKEN = await AsyncStorage.getItem("userToken");
    // console.log(userId);

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/get_video_comment`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          video_id: id,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        // console.warn(result, "==comments");
        setComments(result.data);
        // console.log(result);
      });
  };

  const postComments = async () => {
    setLoading(true);
    console.log(userId);
    const TOKEN = await AsyncStorage.getItem("userToken");
    // console.log(userId);

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/video_comment_post`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          video_id: id,
          user_id: userId,
          comment: comment,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setComment("");
        // console.warn(result, "==commentsPOST");
        getCOmments();
        // console.log(result);
      });
  };

  const renderComment = ({ item }) => {
    return (
      <RenderComment
        item={item}
        setLoading={setLoading}
        getCOmments={getCOmments}
      />
    );
  };

  return (
    <>
      {fullscreen && <StatusBar hidden={true} />}
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          width: width,
          minHeight: height,
          // justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <CustomHeader
          title={"Video"}
          // backbutton={false}
          navigation={navigation}
        />

        {/**video */}
        {/**video */}
        {/* {console.log(item.thumbnail)} */}
        <View
          style={[
            { width: wp(100), height: hp(30) },
            fullscreen && {
              position: "absolute",
              width: height,
              height: width,
              top: wp(52.25),
              left: -hp(25.7),
              // backgroundColor: 'red',
              transform: [{ rotate: "90deg" }],
              zIndex: 1,
            },
          ]}
        >
          {error && (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
              }}
            >
              <Text style={{ color: "white" }}>Coundn't load the video.</Text>
            </View>
          )}
          {!error && (
            <>
              {video[0]?.video_type === 1 && (
                <YoutubePlayer
                  width={wp(100)}
                  height={hp(30)}
                  play={true}
                  videoId={video[0]?.links.slice(-11)}
                  onError={(e) => {
                    console.log(e);
                  }}
                  // onChangeState={onStateChange}
                />
              )}
              {video[0]?.video_type === 3 && (
                <VideoPlayer
                  key={key}
                  onError={() => {
                    setError(true);
                  }}
                  disableBack={true}
                  disableVolume={true}
                  onEnterFullscreen={() => setFullscreen(true)}
                  onExitFullscreen={() => setFullscreen(false)}
                  source={{ uri: video[0]?.file }}
                  videoStyle={[
                    fullscreen && {
                      height: width,
                      width: height,
                    },
                  ]}
                  style={[
                    { width: "100%", height: hp(30) },
                    fullscreen && {
                      // height: 1000,
                      width: height,
                      top: wp(0),
                      backgroundColor: "black",
                      // marginTop: width
                    },
                  ]}
                />
              )}
            </>
          )}
        </View>

        {/**video */}
        {/**video */}

        {/**title */}
        {/**title */}

        <Text
          style={{
            width: wp(85),
            color: "black",
            fontSize: hp(2.5),
            fontWeight: "bold",
            marginVertical: wp(5),
          }}
        >
          {video[0]?.title}
        </Text>
        {/**title */}
        {/**title */}

        {/**des */}
        {/**des */}
        <TouchableOpacity onPress={() => setFullDes(!fullDes)}>
          <Text
            numberOfLines={!fullDes ? 5 : 0}
            style={{
              width: wp(85),
              fontSize: hp(2),
              width: wp(85),
            }}
          >
            {video[0]?.description}
          </Text>
        </TouchableOpacity>
        <View style={styles.line}></View>

        {/**des */}
        {/**des */}

        {/**postComments */}
        {/**postComments */}
        <View
          style={{ width: wp(85), alignItems: "center", flexDirection: "row" }}
        >
          <TextInput
            multiline={true}
            placeholder="Share your thoughts..."
            style={{
              paddingHorizontal: wp(5),
              flex: 1,
              marginRight: wp(5),
              height: textHeight,
              maxHeight: hp(10),
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
            value={comment}
            onChange={(e) => {
              setComment(e.nativeEvent.text);
            }}
            onContentSizeChange={(e) => {
              console.log(e.nativeEvent.contentSize.height);
              setTextHeight(e.nativeEvent.contentSize.height);
            }}
          />
          <Pressable
            onPress={() => postComments()}
            style={[
              {
                width: wp(16),
                height: hp(4.8),
                justifyContent: "center",
                alignItems: "center",
              },
              comment.length > 0
                ? { backgroundColor: "#F9AD19" }
                : { backgroundColor: "rgba(0,0,0,0.1)" },
            ]}
          >
            <Text
              style={{ fontSize: hp(1.8), color: "black", fontWeight: "800" }}
            >
              POST
            </Text>
          </Pressable>
        </View>

        <View style={styles.line}></View>
        {/**postComments */}
        {/**postComments */}

        {/**Comments */}
        {/**Comments */}
        <View style={{ width: wp(85) }}>
          <Text
            style={{
              color: "black",
              fontSize: hp(2),
              fontWeight: "bold",
              marginBottom: wp(5),
            }}
          >
            Comments{" "}
            <Text
              style={{
                fontWeight: "bold",
              }}
            >{`(${comments.length})`}</Text>
          </Text>
        </View>
        {comments.length > 0 ? (
          <FlatList
            data={comments.reverse()}
            renderItem={renderComment}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <Text style={{ textAlign: "center", marginVertical: wp(5) }}>
            No comments.
          </Text>
        )}

        {/**Comments */}
        {/**Comments */}
        <View style={{ width: "100%", height: hp(10) }}></View>

        {/* <View
          // style={{marginTop: -hp(10)}}
          style={{position: 'absolute', bottom: hp(2)}}>
          <Footer navigation={navigation} />
        </View> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    marginVertical: wp(5),
  },
});

export default VideoDetails;
