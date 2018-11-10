import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import DeckList from "../components/DeckList";
import DeckView from "../components/DeckView";
import NewCard from "../components/NewCard";
import NewDeck from "../components/NewDeck";
import QuizView from "../components/QuizView";
import { alpha } from "../utils/colors";

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name={focused ? "ios-albums" : "ios-albums-outline"}
            size={25}
            color={tintColor}
          />
        )
      }
    },
    "Add Deck": {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name={focused ? "ios-add-circle" : "ios-add-circle-outline"}
            size={25}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: alpha,
      inactiveTintColor: "gray"
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createStackNavigator(
  {
    DeckList: {
      screen: Tabs,
      navigationOptions: {
        headerStyle: {
          backgroundColor: alpha
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }
    },
    DeckView: {
      screen: DeckView
    },
    NewCard: {
      screen: NewCard
    },
    QuizView: {
      screen: QuizView
    }
  },
  {
    initialRouteName: "DeckList"
  }
);
