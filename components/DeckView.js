import React from "react";
import { Button, Text, View } from "react-native";
import { formatTitle, getDeck, removeDeck } from "../utils/helpers";

export default class DeckView extends React.Component {
  refresh = () => {
    const deck = this.props.navigation.getParam("deck");
    getDeck(formatTitle(deck.title)).then(deck => this.setState({ deck }));
  };

  componentWillMount() {
    const deck = this.props.navigation.getParam("deck");
    this.setState({ deck });
  }

  render() {
    const { deck } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>Deck {deck.title}</Text>
        <Text style={{ fontSize: 12 }}>{deck.questions.length} cards</Text>
        <Button
          title="Add Card"
          onPress={() => {
            this.props.navigation.navigate("NewCard", {
              deck,
              refreshDeck: this.refresh
            });
          }}
        />
        <Button
          title="Start Quiz"
          onPress={() => {
            this.props.navigation.navigate("QuizView", {
              deck
            });
          }}
        />
        <Button
          title="Delete Deck"
          onPress={() => {
            removeDeck(formatTitle(deck.title)).then(() => {
              this.props.navigation.state.params.refreshDeckList();
              this.props.navigation.navigate("DeckList");
            });
          }}
        />
      </View>
    );
  }
}
