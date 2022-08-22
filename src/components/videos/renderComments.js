import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../../constants/customModal";
import TwoButton from "../../constants/twoButton";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { wp, hp } from "../../constants/styled";

const RenderComment = ({ item, setLoading, getCOmments }) => {
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(item.comment);
  const [textHeight, setTextHeight] = useState(0);
  const [isDeleteComment, setIsDeleteComment] = useState(false);
    // console.log(item);

  const updateComments = async () => {
    setLoading(true);
    // console.log(userId);
    const TOKEN = await AsyncStorage.getItem("userToken");
    // console.log(userId);

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/video_comment_edit`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          id: item.id,
          comment: comment,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setEdit(false);
        // setComment("");
        // console.warn(result, "==commentsPOST");
        getCOmments();
        // console.log(result);
      });
  };

  const deleteComment = async () => {
    setLoading(true);
    // console.log(userId);
    const TOKEN = await AsyncStorage.getItem("userToken");
    // console.log(userId);

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    await fetch(
      `http://ec2-52-53-161-255.us-west-1.compute.amazonaws.com/api/video_comment_delete`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          id: item.id,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setIsDeleteComment(false);
        // setEdit(false);
        // setComment("");
        // console.warn(result, "==commentsPOST");
        getCOmments();
        // console.log(result);
      });
  };

  return (
    <>
      <View
        key={item.id}
        style={{
          width: wp(85),
          paddingVertical: wp(5),
          borderBottomWidth: 1,
          borderColor: "rgba(0,0,0,0.25)",
        }}
      >
        {edit && (
          <>
            <View
              style={{
                width: wp(85),
                alignItems: "center",
                flexDirection: "row",
              }}
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
                  // console.log(e.nativeEvent.contentSize.height);
                  setTextHeight(e.nativeEvent.contentSize.height);
                }}
              />
              <Pressable
                onPress={() => updateComments()}
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
                  style={{
                    fontSize: hp(1.8),
                    color: "black",
                    fontWeight: "800",
                  }}
                >
                  Update
                </Text>
              </Pressable>
            </View>
          </>
        )}
        {!edit && (
          <>
            <Text
              numberOfLines={1}
              style={{ fontSize: hp(2), color: "black", fontWeight: "bold" }}
            >
              {item.user_name}
            </Text>
            <Text
              style={{
                fontSize: hp(2),
                color: "black",
                marginVertical: wp(2.5),
              }}
            >
              {item.comment}
            </Text>
            <View style={{ flexDirection: "row", marginTop: wp(2.5) }}>
              <Pressable
                onPress={() => {
                  setEdit(true);
                }}
              >
                <FontAwesome5
                  name="pen"
                  color={"#F9AD19"}
                  size={hp(2)}
                  style={{ marginRight: wp(5) }}
                />
              </Pressable>

              <Pressable onPress={() => setIsDeleteComment(true)}>
                <FontAwesome5
                  name="trash"
                  color={"#F9AD19"}
                  size={hp(2)}
                  style={{ marginRight: wp(5) }}
                />
              </Pressable>
            </View>
          </>
        )}
      </View>
      <CustomModal
        visible={isDeleteComment}
        title={"This will delete the comment."}
        onPress={() => {
          setIsDeleteComment(false);
        }}
      >
        <TwoButton
          isLoading={false}
          leftLabel={"Okay"}
          rightLabel={"Cancel"}
          leftOnPress={() => {
            deleteComment();
          }}
          rightOnPress={() => {
            setIsDeleteComment(false);
          }}
        />
      </CustomModal>
    </>
  );
};

export default RenderComment;
