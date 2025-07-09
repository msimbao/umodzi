// Carousel.js
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { ThemedButton } from "react-native-really-awesome-button";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");


const Carousel = ({
  data,
  autoScroll = true,
  interval = 5000,
  height = 200,
}) => {
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
    const navigation = useNavigation();
  

  useEffect(() => {
    if (!autoScroll) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoScroll, interval]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

    const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderItem = ({ item }) => (


              <TouchableOpacity style={styles.topPart}>
                <Image
                  style={styles.image}
                  source={item.image}
                  width={width*0.8}
                  height={"80%"}
                />
    
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subTitle}>{item.subtitle}</Text>
                        <ThemedButton
                          style={styles.button}
                          onPress={() => navigation.navigate("HistoryList")}
                          name="bruce"
                          type="primary"
                          height={40}
                          width={width * 0.65}
                          borderRadius={5}
                        >
                          READ ARTICLE
                        </ThemedButton>
              </TouchableOpacity>
  );

  return (
    <View style={[styles.container]}>
      <FlatList
        data={data}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
                  <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              index === currentIndex ? styles.activeIndicator : null,
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width: width * 0.8, 
    height:height*0.45,
    // padding:30,
},
    topPart: {
    width: width * 0.8,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 30,
    // paddingHorizontal: 30,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "left",
    height:height*0.4,
  },
    title: {
    fontSize: 20,
    marginBottom: 0,
    textAlign: "left",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    // width: 300,
    fontWeight: 600,
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "justify",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    // width: 300,
    fontWeight: 600,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  indicator: {
    width: width*0.25,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#333",
  },
    image: {
    bottom: 0,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom:5,
  },
  button:{
    marginTop:5,
    marginBottom:20,
  }
});

export default Carousel;
