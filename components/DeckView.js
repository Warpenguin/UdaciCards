import React from "react";
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { alpha } from "../utils/colors";
import { formatTitle, getDeck, removeDeck } from "../utils/helpers";

export default class DeckView extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: alpha
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  refresh = () => {
    const deck = this.props.navigation.getParam("deck");
    getDeck(formatTitle(deck.title)).then(deck => this.setState({ deck }));
    this.props.screenProps.refresh();
  };

  componentWillMount() {
    const deck = this.props.navigation.getParam("deck");
    this.setState({ deck });
  }

  render() {
    const { deck } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.text, { fontSize: 28 }]}>{deck.title}</Text>
          <Text style={styles.text}>{deck.questions.length} cards</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FFFFFF" }]}
          onPress={() => {
            this.props.navigation.navigate("NewCard", {
              deck,
              refreshDeck: this.refresh
            });
          }}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#000000" }]}
          onPress={() => {
            this.props.navigation.navigate("QuizView", {
              deck
            });
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "transparent" }]}
          onPress={() => {
            removeDeck(formatTitle(deck.title)).then(() => {
              this.props.screenProps.refresh();
              this.props.navigation.navigate("DeckList");
            });
          }}
        >
          <Text style={{ color: "#FF0000" }}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    margin: 10
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20
  },
  text: { fontSize: 16, textAlign: "center" }
});
