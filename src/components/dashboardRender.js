import React, { useState } from "react";
import { wp, hp } from "../constants/styled";
import { View, Text, StyleSheet } from "react-native";
// import VideoPlayer from "react-native-video-player";

const DashboardRender = (props) => {
  const [item, setItem] = useState(props.item);
  return (
    item.type === "video" && (
      <View style={styles.container}>
        {/* <VideoPlayer
          video={{
            uri: item.link,
          }}
          videoWidth={"100%"}
          videoHeight={hp(30)}
          thumbnail={{ uri: item.image }}
        /> */}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(85),
    minHeight: hp(5),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.25)",
    paddingBottom: wp(5),
    marginBottom: wp(5),
  },
});

export default DashboardRender;
