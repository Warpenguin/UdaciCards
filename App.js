import React from "react";
import { StatusBar, View } from "react-native";
import { Constants } from "expo";
import { getDecks } from "./utils/helpers";
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
    this.refresh();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <EpicStatusBar />
        <MainStack screenProps={{ decks: this.state.decks, refresh: () => this.refresh() }} />
      </View>
    );
  }
}
