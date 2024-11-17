import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    //navigate to scheduler w/ data
    navigate("/form", { state: { start: userAnswer1, end: userAnswer2 } });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h1>Little self quiz</h1>
      <p>Let's get to know your sleep schedule!</p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Q.1 When do you usually to go to sleep?</h3>
          <input
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
          <h3>Q.2 When do you usually wake up?</h3>
          <input
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
        <button
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

    </div>
  );
};

export default QuizPage;
