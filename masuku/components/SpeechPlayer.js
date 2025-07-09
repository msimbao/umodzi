// SpeechPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as Speech from 'expo-speech';

const SpeechPlayer = ({ text = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  const chunksRef = useRef([]);
  const currentIndexRef = useRef(0);

  // Split the text into readable chunks
  const splitTextIntoChunks = (input) => {
    return input.match(/[^.!?]+[.!?]*/g) || [input];
  };

  // Start reading from current index
  const speakNextChunk = () => {
    if (currentIndexRef.current < chunksRef.current.length) {
      const chunk = chunksRef.current[currentIndexRef.current];
      setIsPlaying(true);
      Speech.speak(chunk.trim(), {
        onDone: () => {
          currentIndexRef.current += 1;
          setCurrentChunkIndex(currentIndexRef.current);
          if (!isPaused) {
            speakNextChunk();
          }
        },
        onError: () => {
          setIsPlaying(false);
        }
      });
    } else {
      resetPlayback();
    }
  };

  const handlePlay = () => {
    if (!isPlaying || isPaused) {
      setIsPaused(false);
      if (chunksRef.current.length === 0) {
        chunksRef.current = splitTextIntoChunks(text);
      }
      speakNextChunk();
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      Speech.stop();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    Speech.stop();
    resetPlayback();
  };

  const resetPlayback = () => {
    setIsPaused(false);
    setIsPlaying(false);
    setCurrentChunkIndex(0);
    currentIndexRef.current = 0;
    chunksRef.current = [];
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ marginBottom: 10 }}>{text}</Text>
      <Button title="▶️ Play / Resume" onPress={handlePlay} />
      <View style={{ height: 10 }} />
      <Button title="⏸️ Pause" onPress={handlePause} />
      <View style={{ height: 10 }} />
      <Button title="⏹️ Stop" onPress={handleStop} />
    </View>
  );
};

export default SpeechPlayer;
