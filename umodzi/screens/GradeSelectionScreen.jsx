// screens/GradeSelectionScreen.js
import React from 'react';
import {Text, 
        View,
         Image,
         Button,
         StyleSheet,
         TouchableOpacity,
} from 'react-native';

export default function GradeSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {[7, 9, 12].map((grade) => (
        <TouchableOpacity
        style={styles.menuButton}
          key={grade}
        
         onPress={() => navigation.navigate('SubjectSelection', { grade })}
        >

              <Text style={styles.title}>{`Grade ${grade}`}</Text>
              

              { (grade == 7) ? (
                  <Text style={styles.emoji}>🥉</Text>
              ) : (grade == 9) ? (
                  <Text style={styles.emoji}>🥈</Text>
              ) : (
                <Text style={styles.emoji}>🏅</Text>
              )

              }

              

        </TouchableOpacity>
      ))}

      <TouchableOpacity
      style={styles.menuButton}
  onPress={() => navigation.navigate('MyScores')}
>
      <Text style={styles.title}>View My Scores</Text>
    <Text style={styles.emoji}>📜</Text>

</TouchableOpacity>

<TouchableOpacity
  style={[styles.menuButton,{backgroundColor:'#f2f2f2'}]}
  onPress={() => navigation.navigate('Store')}
>
   
    <Text style={styles.title}>Download Content</Text>
    <Text style={styles.emoji}>🎁</Text>

           {/* <Image
                style={styles.tinyLogo}
                source={require('@/assets/photos/Designer.jpeg')}
              /> */}
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor:'#000',
    alignItems:'center'
   },
   emoji:{fontSize: 30},
  scoreCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  title: { fontSize: 24 , fontFamily:'Nunito'},
  menuButton:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius:0,
    padding:30,
    marginBottom:10,
    borderRightWidth:20,
    borderRadius:10,
    borderRightColor:"red",
    width:350,
    height:100,
    backgroundColor:'#fff',
    color:'#fff',
    textAlign:'left'
  }
});
