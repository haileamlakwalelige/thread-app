import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView className="w-screen flex flex-col justify-center items-center">
      <View className="w-screen justify-center items-center pt-10 pb-1">
        <Image
          source={require("../assets/logo.jpg")}
          className="w-[100px] h-[120px]"
        />
      </View>
      <KeyboardAvoidingView>
        <View className="justify-center items-center">
          <Text className="font-extrabold text-base">
            Sign up to Your Account
          </Text>
        </View>
        <View
          className="border-2 mt-5 rounded-xl border-gray-400 py-2 text-lg placeholder:text-lg px-1 min-w-[80vw] gap-x-3"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="person" size={24} color="gray" />
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="Enter your Name"
            className="text-lg  text-gray-700 placeholder:text-lg"
          />
        </View>
        <View
          className="border-2 border-gray-400 rounded-xl py-2  px-1 min-w-[80vw] mt-5 gap-x-3"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialIcons name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            className="text-lg placeholder:text-lg text-gray-700"
          />
        </View>

        <View
          className="border-2 mt-5 rounded-xl border-gray-400 py-2 text-lg placeholder:text-lg px-1 min-w-[80vw] gap-x-3"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <AntDesign name="lock" size={24} color="gray" />
          <TextInput
          secureTextEntry={true}
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            placeholder="Enter your Password"
            className="text-lg  text-gray-700 placeholder:text-lg"
          />
        </View>


        <View style={{ marginTop: 45 }} />

        <View className="flex  flex-col justify-center items-center">
          <Pressable className="w-[150px] bg-black active:bg-gray-800 text-center h-[50px] rounded-xl flex justify-center items-center">
            <Text className="text-white font-bold text-center text-base active:text-[#007fff]">
              Sign Up
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            className="mt-4"
          >
            <Text className="font-semibold text-base text-center">
              Have an account? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
