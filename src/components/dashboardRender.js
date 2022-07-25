import React, { useState } from "react";
import { wp, hp } from "../constants/styled";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";

const DashboardRender = (props) => {
  const [item, setItem] = useState(props.item);
  return (
    <>
      {/**Video */}
      {/**Video */}
      {/**Video */}
      {item.type === "video" && (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("VideoDetails", {
              id: item.content_id,
            })
          }
          style={styles.container}
        >
          <View style={styles.video}>
            <Image
              resizeMode="cover"
              source={{ uri: item.image }}
              style={{ width: "100%", height: "100%" }}
            />
            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            ></View>
            <FontAwesome5Icon
              name="play"
              style={{ position: "absolute" }}
              size={hp(5)}
              color={"white"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: wp(2.5),
            }}
          >
            <Text
              style={{
                fontSize: hp(2.5),
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                numberOfLines={1}
                style={{
                  color: "black",
                  fontSize: hp(2),
                }}
              >
                {item.updated_at.substring(8, 10)}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: hp(2),
                  marginHorizontal: wp(1),
                  // marginTop: wp(2.5),
                }}
              >
                {item.updated_at.substring(5, 7) === "01" && "Jan"}
                {item.updated_at.substring(5, 7) === "02" && "Feb"}
                {item.updated_at.substring(5, 7) === "03" && "Mar"}
                {item.updated_at.substring(5, 7) === "04" && "Apr"}
                {item.updated_at.substring(5, 7) === "05" && "Jun"}
                {item.updated_at.substring(5, 7) === "06" && "Jun"}
                {item.updated_at.substring(5, 7) === "07" && "Jul"}
                {item.updated_at.substring(5, 7) === "08" && "Aug"}
                {item.updated_at.substring(5, 7) === "09" && "Sep"}
                {item.updated_at.substring(5, 7) === "10" && "Oct"}
                {item.updated_at.substring(5, 7) === "11" && "Nov"}
                {item.updated_at.substring(5, 7) === "12" && "Dec"}
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={4}
            style={{ width: "100%", fontSize: hp(1.8), color: "black" }}
          >
            {item.description}
          </Text>
          <Text
            style={{
              width: wp(25),
              padding: hp(1),
              backgroundColor: "#F9AD19",
              borderRadius: hp(2),
              textAlign: "center",
              marginTop: wp(5),
            }}
          >
            Know more
          </Text>
        </TouchableOpacity>
      )}
      {/**Video */}
      {/**Video */}
      {/**Video */}

      {/**AUDIO */}
      {/**AUDIO */}
      {item.type === "audio" && (
        <>
          <TouchableOpacity
            style={[
              styles.container,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: wp(5),
                borderBottomWidth: 0,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: hp(3),
              },
            ]}
          >
            <Image
              style={{
                width: hp(8),
                height: hp(8),
                borderRadius: hp(2),
                marginHorizontal: wp(5),
              }}
              source={{ uri: item.image }}
            />
            <View style={{ height: "100%", flex: 1 }}>
              <Text
                style={{ fontSize: hp(2), fontWeight: "bold", color: "black" }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  marginVertical: wp(2.5),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: "black",
                    fontSize: hp(1.8),
                    maxWidth: wp(30),
                  }}
                >
                  {item.description}
                </Text>
                <View
                  style={{
                    marginHorizontal: wp(2.5),
                    width: 1,
                    height: "100%",
                    backgroundColor: "black",
                  }}
                ></View>
                <Text
                  numberOfLines={1}
                  style={{ color: "black", fontSize: hp(1.8) }}
                >
                  Audio
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: "black",
              fontSize: hp(1.8),
              position: "absolute",
              right: wp(5),
              bottom: wp(2),
            }}
          >
            {item.updated_at.substring(8, 10)}{" "}
            <Text>
              {item.updated_at.substring(5, 7) === "01" && "Jan"}
              {item.updated_at.substring(5, 7) === "02" && "Feb"}
              {item.updated_at.substring(5, 7) === "03" && "Mar"}
              {item.updated_at.substring(5, 7) === "04" && "Apr"}
              {item.updated_at.substring(5, 7) === "05" && "Jun"}
              {item.updated_at.substring(5, 7) === "06" && "Jun"}
              {item.updated_at.substring(5, 7) === "07" && "Jul"}
              {item.updated_at.substring(5, 7) === "08" && "Aug"}
              {item.updated_at.substring(5, 7) === "09" && "Sep"}
              {item.updated_at.substring(5, 7) === "10" && "Oct"}
              {item.updated_at.substring(5, 7) === "11" && "Nov"}
              {item.updated_at.substring(5, 7) === "12" && "Dec"}
            </Text>
          </Text>
        </>
      )}
      {/**AUDIO */}
      {/**AUDIO */}

      {/**Event */}
      {/**Event */}
      {item.type === "event" && (
        <>
          <TouchableOpacity
            style={[
              styles.container,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 0,
                borderBottomWidth: 0,
                backgroundColor: "rgba(0,0,0,0.1)",
                // borderRadius: hp(3),
              },
            ]}
          >
            <Text
              style={{
                color: "#F9AD19",
                fontSize: hp(1.5),
                position: "absolute",
                right: wp(5),
                top: wp(2.5),
              }}
            >
              {item.updated_at.substring(11, 16)}
            </Text>
            <View
              style={{
                width: wp(1),
                height: "100%",
                minHeight: hp(5),
                backgroundColor: "#F9AD19",
              }}
            ></View>
            <View
              style={{
                width: hp(5),
                height: hp(5),
                backgroundColor: "rgba(0,0,0,0.2)",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: wp(5),
                borderRadius: hp(5),
                marginVertical: wp(5),
              }}
            >
              {/* {console.log(item)} */}
              <FontAwesome5Icon
                name={"calendar"}
                size={hp(2.5)}
                color={"white"}
              />
            </View>
            <View
              style={{
                marginRight: wp(5),
                flex: 1,
                height: "100%",
                paddingVertical: wp(5),
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                New event added.
              </Text>
              {console.log(item)}
              <Text style={{ fontSize: hp(1.8) }} numberOfLines={4}>
                <Text>{item.title}</Text>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
      {/**Event */}
      {/**Event */}
    </>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: hp(25),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: wp(85),
    minHeight: hp(5),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.25)",
    paddingBottom: wp(5),
    marginBottom: wp(10),
  },
});

export default DashboardRender;
