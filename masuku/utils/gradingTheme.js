const GradingThemes = {
    "PERFECT": {
      min: 100,
      max: 100,
      color:"#fff",
      backgroundColor:"#333",
      text: "Outstanding! That's a perfect score. Keep on aiming high!",
    },
    "EXCELLENT": {
      min: 90,
      max: 99,
      color:"#ffffff",
      backgroundColor: "#58D68D",
      text: "You're mastering this — just a few steps away from perfection!",
    },
    "GREAT": {
      min: 80,
      max: 89,
      color:"#ffffff",
      backgroundColor:"#5DADE2",
      text: "You're doing really well — keep it up and you'll be on top soon! ",
    },
    "GOOD": {
      min: 70,
      max: 79,
      color:"#ffffff",
      backgroundColor:"#A569BD",
      text: "Good work! You're on the right track and will shine even brighter!",
    },
    "OKAY": {
      min: 60,
      max: 69,
      color:"#000000",
      backgroundColor:"#F7DC6F",
      text: "Not bad! You’ve got a great foundation. Improvement is ahead!",
    },
    "POOR": {
      min: 50,
      max: 59,
      color:"#fff",
      backgroundColor:"#F5B041",
      text: "You’re getting there, you just need a little more effort and focus!",
    },
    "FAIL": {
      min: 0,
      max: 49,
      color: "#ffffff",
      backgroundColor: "#EC7063",
      text: "Every expert was once a beginner. Keep learning and you'll grow too!",
    },
  };

  export default GradingThemes;