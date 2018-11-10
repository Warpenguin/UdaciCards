import React from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { alpha } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

export default class QuizView extends React.Component {
  static navigationOptions = {
    title: "Quiz",
    headerStyle: {
      backgroundColor: alpha
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentWillMount() {
    this.init();
  }

  init = () => {
    const deck = this.props.navigation.getParam("deck");
    this.setState({
      deck,
      answeredCards: [],
      currentCard:
        deck.questions[Math.floor(Math.random() * deck.questions.length)]
    });
  };

  answer = isCorrect => {
    const {
      answeredCards,
      currentCard,
      deck: { questions }
    } = this.state;
    let answered = answeredCards;
    answered.push({
      question: currentCard.question,
      isCorrect
    });

    remainingCards = questions.filter(q => {
      return answeredCards.findIndex(x => x.question === q.question) < 0;
    });

    this.setState(state => {
      return {
        ...state,
        answeredCards: answered,
        showAnswer: false,
        currentCard:
          remainingCards[Math.floor(Math.random() * remainingCards.length)]
      };
    });

    // -- quiz completed
    if (!currentCard) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  render() {
    const { answeredCards, currentCard, deck, showAnswer } = this.state;
    return deck.questions.length == 0 ? (
      <View style={styles.containerInvalid}>
        <Text style={{ fontSize: 22, textAlign: "center" }}>
          Sorry, you cannot take a quiz because there are no cards in the deck.
        </Text>
      </View>
    ) : currentCard ? (
      <View style={styles.containerQuiz}>
        <View style={{ flex: 1 }}>
          <Text>
            {answeredCards.length + 1} / {deck.questions.length}
          </Text>
          <Text style={{ fontSize: 36, textAlign: "center" }}>
            {showAnswer ? currentCard.answer : currentCard.question}
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() => this.setState({ showAnswer: !showAnswer })}
          >
            <Text style={{ textAlign: "center", color: "#d4271b" }}>
              {showAnswer ? "Question" : "Answer"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#008000" }]}
          onPress={() => {
            this.answer(true);
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#d4271b" }]}
          onPress={() => {
            this.answer(false);
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.containerComplete}>
        <Text style={styles.text}>All done!</Text>
        <Text style={styles.text}>
          You scored{" "}
          {(
            (answeredCards.filter(c => {
              return c.isCorrect;
            }).length /
              deck.questions.length) *
            100
          ).toFixed(2)}
          %!
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#008000" }]}
            onPress={() => {
              this.init();
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#000000" }]}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerComplete: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  },
  containerInvalid: { flex: 1, justifyContent: "center" },
  containerQuiz: { flex: 1, padding: 20 },
  button: {
    alignItems: "center",
    padding: 10,
    margin: 10
  },
  text: { fontSize: 28, textAlign: "center" }
});
