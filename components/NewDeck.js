import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { saveDeck, formatTitle } from "../utils/helpers";

export default class NewDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  submit() {
    const decks = this.props.navigation.getParam("decks", {});
    let titleFormatted = formatTitle(this.state.text);
    if (decks[titleFormatted] != undefined) {
      alert(
        "Deck with this title already exists! Please enter a different title."
      );
    } else {
      saveDeck(titleFormatted).then(() => {
        this.props.navigation.state.params.refreshDeckList();
        this.props.navigation.navigate("DeckList");
        alert("Deck created successfully!");
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>New Deck</Text>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Deck Title"
          value={this.state.text}
          maxLength={40}
          onChangeText={text => this.setState({ text })}
        />
        <Button
          title="Submit"
          onPress={() => {
            this.submit();
          }}
        />
      </View>
    );
  }
}
