import React from "react";
import { StatusBar, View } from "react-native";
import { Constants } from "expo";
import MainStack from "./routes/Main";

function EpicStatusBar() {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor="#293046"
        barStyle="light-content"
      />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <EpicStatusBar />
        <MainStack />
      </View>
    );
  }
}
