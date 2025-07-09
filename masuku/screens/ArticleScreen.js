import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { saveQuizzesToLocal } from "@/utils/QuizStore";
import quizzesData from "@/data/quizzes.json"; // Adjust if importing fails in Expo
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";

const { width, height } = Dimensions.get("window");
import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { getNavOptions } from "expo-router/build/views/Sitemap";
import Carousel from "@/components/Carousel";

import SvgBackground from "@/components/SvgBackground";

const store = require("@/assets/images/30.png");
const science = require("@/assets/images/D.png");
const scared = require("@/assets/images/exam.png");

const browse = require("@/assets/images/downloaded.png");

export default function StoreScreen({ navigation }) {
  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });
  const [isConnected, setIsConnected] = useState(null);

  const DATA = [
    {
      id: "1",
      title: "Grade 7",
      grade: 7,
      iconName: "telescope",
    },
    // {
    //   id: "2",
    //   title: "Grade 8",
    //   grade: 8,
    // },
    {
      id: "3",
      title: "Grade 9",
      grade: 9,
      iconName: "sparkles",
    },
    // {
    //   id: "4",
    //   title: "Grade 10",
    //   grade: 10,
    // },
    // {
    //   id: "5",
    //   title: "Grade 11",
    //   grade: 11,
    // },
    {
      id: "6",
      title: "Grade 12",
      grade: 12,
      iconName: "rocket",
    },
  ];


  const NewsData = [
 {
  "id": "news-umozdi-launch-001",
  "title": "Umozdi Goes Live!",
  "subtitle": "A New Dawn for Zambian Students — Your Revision Companion is Here 🎓📱",
  "image": store,
  "article": "The wait is over — *Umozdi* is officially live! 🎉\n\nCreated with the heart of the Zambian student in mind, Umozdi is a new mobile revision app designed to help learners across various grades sharpen their knowledge through interactive tests and quizzes. From Lusaka to Livingstone, students now have the power to revise smarter, not harder.\n\n\"We built Umozdi to close the gap between students and quality revision tools,\" said one of the lead developers. \"Whether you're prepping for final exams or brushing up on a tough topic, Umozdi is your go-to companion.\"\n\nThe app offers subject-specific quizzes, timed test sessions, and progress tracking — all tailored to match the Zambian curriculum. 📚✅\n\nTeachers and students alike are already buzzing with excitement. Early users report that the platform feels intuitive, reliable, and—most importantly—motivating.\n\nTo all students across Zambia: Umozdi is calling! Tap in, test yourself, and take your learning journey to new heights. 🚀\n\nDownload it today, and let your revision come alive.",
  "call_to_action": "Explore Umozdi now and get ahead of your class! 🇿🇲"
},
{
  "id": "umozdi-how-to-use-001",
  "title": "Getting Started with Umozdi",
  "subtitle": "Your Smart Study Buddy is Ready — Here's How to Use It Efficiently 📚✨",
  "image": science,
  "article": "Learning just got easier, and smarter, with *Umozdi* — Zambia’s very own revision app for students across all grades. 🇿🇲📱\n\nHere’s how to dive in:\n\n1️⃣ Head to the *Library* section of the app. There, you’ll find materials organized by *Grade*.\n\n2️⃣ Pick the *Subject* you want to revise — from Maths to Science to English and more.\n\n3️⃣ Choose a *Test* from the list. Whether it’s a quick quiz or a full practice exam, you’re in control.\n\n4️⃣ When you're ready, hit *Start*. The test begins immediately, and you can pace yourself as you go.\n\n5️⃣ Need help reading? Tap the *Play* buttons 🔊 — Umozdi will read the questions out loud for you. Perfect for learners who benefit from audio guidance.\n\n6️⃣ To select an answer, simply tap on the option you think is right. The app is interactive and built to respond to your choices.\n\n7️⃣ Once done, view your *Test History* to track progress and learn from your mistakes. Every step brings you closer to confidence and success. ✅\n\nUmozdi is here to empower students — not just with information, but with the tools to understand it. 💡\n\nSo grab your phone, open the app, and take charge of your learning journey today!",
  "call_to_action": "Download Umozdi now and explore your path to better grades!"
},
{
  "id": "exam-confidence-guide-002",
  "title": "Get Equipped For Exams!",
  "subtitle": "Easy Study Tips to Help You Feel Well Equipped, Brave, Ready and Prepared 🛡️",
  "image": scared,
  "article": "Exams can feel a little scary sometimes 😟 — like a big lion roaring at you. But guess what? You are braver than you think 🦁💛!\n\nHere’s how to fight those exam fears and feel strong and ready:\n\n🕒 **Use the Pomodoro Trick**: Study for 25 minutes (like a little race), then take a 5-minute break to stretch, drink water, or dance! After four Pomodoros, take a longer break. It helps your brain stay happy and not tired.\n\n📅 **Make a Study Plan**: Grab a piece of paper and write what you’ll study each day. You don’t have to do it all at once! Maybe:\n- Monday: Math 🧮\n- Tuesday: English 📚\n- Wednesday: Science 🔬\n\n🎯 **Set Small Goals**: Don’t say “I’ll study the whole book.” Try “Today I’ll learn 5 new words” or “I’ll answer 10 questions.” That feels easier and more fun!\n\n🎧 **Listen and Learn**: Apps like *Umozdi* can read the questions out loud to you 🎙️. Just press the play button and listen — like storytime, but for school!\n\n🙏 **Pray Before You Study**: Prayer helps calm your heart and gives you peace. Ask God to help you remember what you read, and to give you courage when you feel nervous. He’s always with you, even during exams.\n\n✅ **Practice Makes You Strong**: Take little tests on Umozdi and check your answers. It’s okay to make mistakes. Mistakes help us learn!\n\n💤 **Rest is Part of Studying**: Your brain needs sleep and fun too. Don’t forget to play and laugh!\n\nRemember, exams are just a way to show what you know. You're not alone — you have tools, time, and faith on your side. You’ve got this! 🚀",
  "call_to_action": "\"I can do all things through Christ who strengthens me.\" — Philippians 4:13 🙏✨"
}



  ]

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []);

  const downloadQuizzes = async () => {
    await saveQuizzesToLocal(quizzesData);
    alert("Quizzes downloaded!");
  };

  const goToGrade = (grade) => {
    navigation.navigate("StoreList", { grade });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => goToGrade(item.grade)}
      style={styles.cards}
    >
      <Text style={styles.title}>{item.title}</Text>

      <Ionicons name={item.iconName} size={30} color={"#333"} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Umodzi Library</Text>
        <Text style={styles.subHeader}>Download Articles and Quizzes</Text>

        {/* <Carousel data={DATA} height={250} /> */}

        <View>
          <Carousel data={NewsData} height={250} />
{/* 
          <View style={styles.topPart}>
            <Image
              style={styles.storeImage}
              source={store}
              width={width}
              height={270}
            />

            <Text style={styles.header}>We're Live!</Text>
            <Text style={styles.subHeader}>The Umodzi library is open!</Text>
          </View> */}

          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton}>
              <Image
                style={styles.storeImage}
                source={browse}
                width={width}
                height={180}
              />
              <Text style={styles.footerText}>Browse Tests!</Text>
            </TouchableOpacity>

            {/* {isConnected ? ( */}
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: width * 0.01 }} // <-- Adds space at the bottom
            />

            {/* ) : ( */}
            {/* <View>
              <Text style={styles.emptyText}>No Data Connection</Text>
            </View> */}
            {/* )} */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: height * 0.08,
    alignItems: "center",
    backgroundColor: "#e5e6fa",
    // height:height*1.5,
  },
  header: {
    fontSize: 40,
    marginBottom: 0,
    textAlign: "left",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 600,
  },
  storeImage: {
    bottom: 0,
    resizeMode: "contain",
    alignSelf: "center",
  },

  topPart: {
    width: width * 0.8,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 5,
  },
  cards: {
    borderRadius: 5,
    width: width * 0.374,
    elevation: 5,
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    height: 70,
    marginVertical: 5,
  },
  title: {
    fontSize: 17,
    justifyContent: "center",
    alignContent: "center",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  subjects: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    marginBottom: 20,
    width: width * 0.45,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  button: {
    bottom: 50,
    marginTop: 50,
  },
  footer: {
    // marginVertical: 5,
    alignContent: "center",
    // justifyContent: "space-between" ,
    flexDirection: "row",
  },
  footerButton: {
    width: width * 0.4,
    backgroundColor: "white",
    elevation: 5,
    height: 230,
    marginRight: 10,
    top: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footerText: {
    textAlign: "center",
    width: "100%",
    fontFamily: "Jersey25_400Regular",
    fontWeight: 600,
    fontSize: 20,
  },
});
