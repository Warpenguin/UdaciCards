import React from "react";
import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";
const NOTIFICATION_KEY = "UdaciCards:notifications";
const DECKS_KEY = "UdaciCards:decks";

export function formatTitle(title) {
  return title.replace(/\s+/g, "");
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_KEY).then(JSON.parse);
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then(data => {
      return data[title];
    });
}

export function saveDeck(title) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        data = {};
      }
      data[title] = { title: title, questions: [] };
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    });
}

export function removeDeck(title) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then(data => {
      delete data[title];
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    });
}

export function addCard(title, card) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then(data => {
      data[title].questions.push({
        question: card.question,
        answer: card.answer
      });
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    });
}

export function removeCard(title, question) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then(data => {
      data[title].questions = data[title].questions.filter(
        c => c.question !== question
      );
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    });
}

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to do you quiz for today!"
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Log your stats!",
    body: "👋 don't forget to do your quiz for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
