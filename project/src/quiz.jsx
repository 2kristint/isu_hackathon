import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quizPage.css";

const QuizPage = () => {

  //for navigation
  const navigate = useNavigate();

  // State to store user's input and feedback
  const [userAnswer1, setUserAnswer1] = useState("");
  const [userAnswer2, setUserAnswer2] = useState("");



  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //const wakeUpTime = userAnswer1.trim();
    //const sleepTime = userAnswer2.trim();

    setUserAnswer1(""); // Clear the input field
    setUserAnswer2("");

    //navigate to formsTogether w/ data
    navigate("/form", { state: { start: userAnswer1, end: userAnswer2 } });
  };

  return (
    <div className = "quiz-container" style={{ fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h1 >Little self quiz</h1>
      <h2 className = "subheader">Let's get to know your sleep schedule! 🌿🌙</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', padding:0}}>
          <h3 className = "quiz-question">Q.1 When do you usually to go to sleep?</h3>
          <input className = "quiz-input"
            type="text"
            placeholder="Type your answer"
            value={userAnswer1}
            onChange={(e) => setUserAnswer1(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "300px",
              height: "50px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <h3 className = "quiz-question">Q.2 When do you usually wake up?</h3>
          <input className = "quiz-input"
            type="When do you usually wake up?"
            placeholder="Type your answer"
            value={userAnswer2}
            onChange={(e) => setUserAnswer2(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "300px",
              height: "50px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}

          />
        </div>
        <br />
        <button className = "quiz-button"
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
        <img className = "image" src = "./AdobeStock_782188559 [Converted].png"></img>
    </div>
  );
};

export default QuizPage;
