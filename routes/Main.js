import { createStackNavigator } from "react-navigation";
import DeckList from "../components/DeckList";
import DeckView from "../components/DeckView";
import NewCard from "../components/NewCard";
import NewDeck from "../components/NewDeck";
import QuizView from "../components/QuizView";

export default createStackNavigator(
  {
    DeckList: {
      screen: DeckList
    },
    DeckView: {
      screen: DeckView
    },
    NewCard: {
      screen: NewCard
    },
    NewDeck: {
      screen: NewDeck
    },
    QuizView: {
      screen: QuizView
    }
  },
  {
    initialRouteName: "DeckList"
  }
);
