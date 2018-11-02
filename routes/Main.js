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

const HomeStack = createStackNavigator(
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
    QuizView: {
      screen: QuizView
    }
  },
  {
    initialRouteName: "DeckList"
  }
);

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack
    },
    NewDeck: {
      screen: NewDeck
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-albums${focused ? "" : "-outline"}`;
        } else if (routeName === "NewDeck") {
          iconName = `ios-add-circle${focused ? "" : "-outline"}`;
        }

        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "indigo",
      inactiveTintColor: "gray"
    }
  },
  {
    initialRouteName: "Home"
  }
);
