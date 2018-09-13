import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { addCard, formatTitle } from "../utils/helpers";

export default class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: "", answer: "" };
  }

  submit() {
    const deck = this.props.navigation.getParam("deck", {});
    var duplicate = deck.questions.filter(q => {
      return q.question === this.state.question;
    });
    if (duplicate.length > 0) {
      alert("This question already exists! Please enter a different question.");
    } else {
      addCard(formatTitle(deck.title), {
        question: this.state.question,
        answer: this.state.answer
      }).then(() => {
        this.props.navigation.state.params.refreshDeck();
        this.props.navigation.goBack();
        alert("Card added successfully!");
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Add card</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Question text"
          value={this.state.question}
          maxLength={40}
          onChangeText={question => this.setState({ question })}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Answer text"
          value={this.state.answer}
          maxLength={40}
          onChangeText={answer => this.setState({ answer })}
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
