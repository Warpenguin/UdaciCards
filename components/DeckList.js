import React from "react";
import { Button, Text, View } from "react-native";
import { AppLoading } from "expo";
import { getDecks } from "../utils/helpers";

export default class DeckList extends React.Component {
  render() {
    if (!this.props.screenProps) {
      return <AppLoading />;
    }

    const { decks } = this.props.screenProps;

    return (
      <View style={{ flex: 1 }}>
        {Object.keys(decks).map(key => {
          const deck = decks[key];
          return (
            <View key={key} style={{ padding: 5 }}>
              <Text
                style={{ fontSize: 16 }}
                onPress={() => {
                  this.props.navigation.navigate("DeckView", {
                    deck
                  });
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
      </View>
    );
  }
}
