import React from "react";
import { Button, Text, View } from "react-native";

export default class QuizView extends React.Component {
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
        currentCard:
          remainingCards[Math.floor(Math.random() * remainingCards.length)]
      };
    });
  };

  render() {
    const { answeredCards, currentCard, deck, showAnswer } = this.state;
    return deck.questions.length == 0 ? (
      <View>
        <Text >Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
        </View>
    ) : currentCard ? (
      <View style={{ flex: 1 }}>
        <Text>
          {answeredCards.length + 1} / {deck.questions.length}
        </Text>
        <Text>{showAnswer ? currentCard.answer : currentCard.question}</Text>
        <Button
          title={showAnswer ? "View Question" : "View Answer"}
          onPress={() => this.setState({ showAnswer: !showAnswer })}
        />
        <Button title="Correct" onPress={() => this.answer(true)} />
        <Button title="Incorrect" onPress={() => this.answer(false)} />
      </View>
    ) : (
      <View>
        <Text>All done!</Text>
        <Text>
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
        <Button title="Restart Quiz" onPress={() => this.init()} />
        <Button
          title="Back to Deck"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
