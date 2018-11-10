import React from "react";
import {
  Button,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { AppLoading } from "expo";
import { alpha } from "../utils/colors";
import { getDecks } from "../utils/helpers";

export default class DeckList extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: { alpha }
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    if (!this.props.screenProps) {
      return <AppLoading />;
    }

    const { decks } = this.props.screenProps;

    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).length <= 0 ? (
          <View style={styles.containerWelcome}>
            <Text style={[styles.text, { marginBottom: 10 }]}>Welcome!</Text>
            <Text style={[styles.text, { fontSize: 18 }]}>
              You have not created any decks. To get started, please select 'Add
              Deck' below.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("Add Deck");
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Add Deck</Text>
            </TouchableOpacity>
          </View>
        ) : (
          Object.keys(decks).map(key => {
            const deck = decks[key];
            return (
              <TouchableWithoutFeedback
                key={key}
                onPress={() => {
                  this.props.navigation.navigate("DeckView", {
                    deck
                  });
                }}
              >
                <View style={styles.deck}>
                  <Text style={styles.text}>{deck.title}</Text>
                  <Text style={[styles.text, { fontSize: 16 }]}>
                    {deck.questions.length} cards
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerWelcome: { flex: 1, padding: 20 },
  deck: {
    padding: 10
  },
  text: {
    textAlign: "center",
    fontSize: 28
  },
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: alpha,
    margin: 10
  }
});
