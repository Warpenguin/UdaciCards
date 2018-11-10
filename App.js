import React from "react";
import { StatusBar, View } from "react-native";
import { Constants } from "expo";
import { alpha } from "./utils/colors";
import { getDecks } from "./utils/helpers";
import { setLocalNotification } from "./utils/helpers";
import MainStack from "./routes/Main";

function EpicStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  state = {
    ready: false,
    decks: {}
  };

  refresh = () => {
    getDecks().then(decks =>
      this.setState({ decks: decks ? decks : {}, ready: true })
    );
  };

  componentDidMount() {
    setLocalNotification();
    this.refresh();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <EpicStatusBar backgroundColor={alpha} barStyle="light-content" />
        <MainStack
          screenProps={{
            decks: this.state.decks,
            refresh: () => this.refresh()
          }}
        />
      </View>
    );
  }
}
