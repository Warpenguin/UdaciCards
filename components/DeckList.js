import React from "react";
import { Button, Text, View } from "react-native";
import { AppLoading } from "expo";
import { getDecks } from "../utils/helpers";

export default class DeckList extends React.Component {
  state = {
    ready: false,
    decks: {}
  };

  refresh = () => {
    getDecks().then(decks =>
      this.setState({ decks: decks === undefined ? {} : decks, ready: true })
    );
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    const { decks, ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        <Text>Deck List</Text>
        {Object.keys(decks).map(key => {
          const deck = decks[key];
          return (
            <View key={key} style={{ padding: 5 }}>
              <Text
                style={{ fontSize: 16 }}
                onPress={() => {
                  this.props.navigation.navigate("DeckView", { deck });
                }}
              >
                {deck.title}
              </Text>
              <Text style={{ fontSize: 12 }}>
                {deck.questions.length} cards
              </Text>
            </View>
          );
        })}
        <Button
          title="New Deck"
          onPress={() => {
            this.props.navigation.navigate("NewDeck", {
              decks,
              refreshDeckList: this.refresh
            });
          }}
          style={{ position: "absolute", bottom: 0 }}
        />
      </View>
    );
  }
}
