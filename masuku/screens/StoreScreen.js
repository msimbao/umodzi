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
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { getNavOptions } from "expo-router/build/views/Sitemap";
import Carousel from "@/components/Carousel";

import SvgBackground from "@/components/SvgBackground";

const store = require("@/assets/images/money.png");
const science = require("@/assets/images/open.png");
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
      title: "Get New Tests",
      page: "StoreGrade",
      iconName: "telescope",
    },

    {
      id: "2",
      title: "Start Your Saved Tests",
      page: "Subjects",
      iconName: "sparkles",
    },

    {
      id: "3",
      title: "View Your Saved Articles",
      page: "ArticleList",
      iconName: "rocket",
    },
  ];

  const NewsData = [
    {
      id: "news-umozdi-launch-001",
      title: "Umodzi Library is Open!",
      subtitle: "A New Dawn for Zambian Students ",
      image: science,
      article:
        'The wait is over — *Umozdi* is officially live! 🎉\n\nCreated with the heart of the Zambian student in mind, Umozdi is a new mobile revision app designed to help learners across various grades sharpen their knowledge through interactive tests and quizzes. From Lusaka to Livingstone, students now have the power to revise smarter, not harder.\n\n"We built Umozdi to close the gap between students and quality revision tools," said one of the lead developers. "Whether you\'re prepping for final exams or brushing up on a tough topic, Umozdi is your go-to companion."\n\nThe app offers subject-specific quizzes, timed test sessions, and progress tracking — all tailored to match the Zambian curriculum. 📚✅\n\nTeachers and students alike are already buzzing with excitement. Early users report that the platform feels intuitive, reliable, and—most importantly—motivating.\n\nTo all students across Zambia: Umozdi is calling! Tap in, test yourself, and take your learning journey to new heights. 🚀\n\nDownload it today, and let your revision come alive.',
      call_to_action: "Explore Umozdi now and get ahead of your class! 🇿🇲",
    },

    {
      id: "exam-confidence-guide-002",
      title: "Get Equipped For Exams!",
      subtitle: "Study Tips to Help You Feel Prepared",
      image: scared,
      article:
        "Exams can feel a little scary sometimes 😟 — like a big lion roaring at you. But guess what? You are braver than you think 🦁💛!\n\nHere’s how to fight those exam fears and feel strong and ready:\n\n🕒 **Use the Pomodoro Trick**: Study for 25 minutes (like a little race), then take a 5-minute break to stretch, drink water, or dance! After four Pomodoros, take a longer break. It helps your brain stay happy and not tired.\n\n📅 **Make a Study Plan**: Grab a piece of paper and write what you’ll study each day. You don’t have to do it all at once! Maybe:\n- Monday: Math 🧮\n- Tuesday: English 📚\n- Wednesday: Science 🔬\n\n🎯 **Set Small Goals**: Don’t say “I’ll study the whole book.” Try “Today I’ll learn 5 new words” or “I’ll answer 10 questions.” That feels easier and more fun!\n\n🎧 **Listen and Learn**: Apps like *Umozdi* can read the questions out loud to you 🎙️. Just press the play button and listen — like storytime, but for school!\n\n🙏 **Pray Before You Study**: Prayer helps calm your heart and gives you peace. Ask God to help you remember what you read, and to give you courage when you feel nervous. He’s always with you, even during exams.\n\n✅ **Practice Makes You Strong**: Take little tests on Umozdi and check your answers. It’s okay to make mistakes. Mistakes help us learn!\n\n💤 **Rest is Part of Studying**: Your brain needs sleep and fun too. Don’t forget to play and laugh!\n\nRemember, exams are just a way to show what you know. You're not alone — you have tools, time, and faith on your side. You’ve got this! 🚀",
      call_to_action:
        '"I can do all things through Christ who strengthens me." — Philippians 4:13 🙏✨',
    },
    {
      id: "umozdi-how-to-use-001",
      title: "Writing a CV for Jobs",
      subtitle: "Advice for Students with No Experience ",
      image: store,
      article:
        "Creating a CV with no job experience can feel intimidating, but it’s absolutely possible to make a strong first impression. Here’s a clear step-by-step guide to help you build a solid CV that reflects your potential, even if you’re just finishing high school.\n\n1. **Start with Contact Information**\nInclude your full name, phone number, email address (make sure it sounds professional), and optionally, your city and country. If you have a LinkedIn profile or online portfolio, include that too.\n\n2. **Write a Strong Personal Statement**\nThis is a 2–3 sentence summary at the top of your CV. Focus on your strengths, interests, and goals. Example: “Motivated high school graduate passionate about science and technology. Strong organizational skills and a willingness to learn. Seeking opportunities to grow and contribute to a dynamic team.”\n\n3. **List Your Education**\nThis is your most important section as a recent graduate. Include:\n- Name of your school\n- Dates attended\n- Final or expected grades (if they’re good)\n- Any honors, awards, or relevant coursework\n\nExample:\n**St. Mary’s Secondary School** (2020–2024)\nGrade 12 Certificate – Distinction\nRelevant subjects: Biology, Mathematics, English\n\n4. **Highlight Skills**\nEven without a job, you’ve gained skills from school, volunteering, or hobbies. List soft and hard skills that are relevant to the type of job or internship you want.\n- Communication\n- Teamwork\n- Time management\n- Public speaking\n- Basic computer skills (e.g., Microsoft Word, Excel, Canva)\n- Social media knowledge\n\n5. **Include Volunteering, Projects, or Clubs**\nThis replaces “Work Experience.” Include any clubs, competitions, or volunteer work. Treat each entry like a job:\n\n**Youth Environmental Club – Member (2023–2024)**\nOrganized campus clean-up events and managed club communications. Helped raise awareness on recycling among students.\n\n**School Science Fair Project – Team Leader (2022)**\nLed a group of 3 to build a working solar oven. Presented results to judges and won 2nd place.\n\n6. **Add Certifications or Short Courses**\nIf you’ve completed any free online courses (e.g., Coursera, Khan Academy, Alison), list them here. Example:\n- “Digital Marketing Basics” – Google Digital Garage\n- “Intro to Computer Science” – CS50x, Harvard University (edX)\n\n7. **Keep It Simple and Clean**\nUse a free template from Canva, Zety, or Google Docs. Stick to one page. Use bold for headings, bullet points for clarity, and a basic font like Arial or Calibri.\n\n8. **Tailor for Each Application**\nEvery time you apply somewhere, tweak your CV to highlight what fits that opportunity. Read the job or internship post carefully and match keywords in your skills and statement.\n\n9. **Proofread Carefully**\nNo grammar mistakes or typos. Ask a teacher, friend, or mentor to read your CV and give honest feedback.\n\n10. **Save as PDF**\nAlways send your CV as a PDF to preserve the formatting. Name the file professionally: `FirstName_LastName_CV.pdf`.\n\n**Final Tip:**\nYour CV is not about what you *haven’t* done — it’s about showing what you *can* do. Focus on potential, attitude, and your ability to learn and grow.",
      call_to_action:
        "Ready to create your first CV? Use this guide to draft your own, then ask a mentor or teacher to review it. Your journey starts with one page — make it count!",
    },
  ];

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []);

  const goToGrade = (page) => {
    navigation.navigate(page);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToGrade(item.page)} style={styles.cards}>
      <Text style={styles.title}>{item.title}</Text>

      <Ionicons name={item.iconName} size={30} color={"#333"} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Umodzi Library</Text>
        <Text style={styles.subHeader}>Download Articles and Quizzes</Text>

        <View>
          <Carousel data={NewsData} height={height*0.275} />

          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: width * 0.01 }} // <-- Adds space at the bottom
          />
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

  cards: {
    borderRadius: 3,
    width: width * 0.8,
    elevation: 3,
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    height: 70,
    marginVertical: 5,
    alignContent: "center",
    verticalAlign: "midddle",
  },
  title: {
    fontSize: 17,
    justifyContent: "center",
    alignContent: "center",
    verticalAlign: "midddle",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
    width:"80%",
  },
  subjects: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    // marginBottom: 20,
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
    elevation: 3,
    height: 230,
    marginRight: 10,
    top: 5,
    borderRadius: 3,
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
