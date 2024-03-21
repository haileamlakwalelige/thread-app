import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NativeWindStyleSheet } from "nativewind";
import StackNavigation from './StackNavigation';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
   <>
   <StackNavigation />
   </>
  )
}