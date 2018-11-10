import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { alpha } from "../utils/colors";
import { addCard, formatTitle } from "../utils/helpers";

export default class NewCard extends React.Component {
  static navigationOptions = {
    title: "Add Card",
    headerStyle: {
      backgroundColor: alpha
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

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
    } else if (!this.state.question) {
      alert("Please capture a question.");
    } else if (!this.state.answer) {
      alert("Please capture an answer.");
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
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={[styles.input, { marginBottom: 10 }]}
            underlineColorAndroid="transparent"
            placeholder="Question"
            value={this.state.question}
            maxLength={40}
            onChangeText={question => this.setState({ question })}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Answer"
            value={this.state.answer}
            maxLength={40}
            onChangeText={answer => this.setState({ answer })}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.submit();
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: alpha,
    margin: 10
  },
  container: { flex: 1, padding: 20 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    padding: 5
  }
});
