import React, { useState } from "react";

export default function OnboardingPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //  answers is a map-- and order is sensitive for call to Supabase
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [`question-${currentQuestionIndex}`]: value,
    });
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBackClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };
  console.log(answers);

  const progress = (currentQuestionIndex / questions.length) * 100;

  const currentQuestion = questions[currentQuestionIndex];
  const ProgressBar = ({ progress }) => (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div className="text-right"></div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
        ></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 mt-16">
      <ProgressBar progress={progress} />
      <h1 className="text-3xl font-bold">{currentQuestion.text}</h1>
      <p className="text-lg mb-4">{currentQuestion.subtitle}</p>
      {currentQuestion.type === "text" ? (
        <input
          type="text"
          name={`question-${currentQuestion.id}`}
          value={answers[`question-${currentQuestion.id}`] || ""}
          onChange={handleAnswerChange}
          className="block w-full border border-gray-400 rounded-lg py-2 px-4 mb-4"
        />
      ) : currentQuestion.type === "multiple-choice" ? (
        <div className="flex flex-col">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswerChange(choice)}
              className={`border border-gray-400 hover:bg-blue-500 hover:text-white rounded-lg py-2 px-4 mb-2 
			  ${
          answers[`question-${currentQuestionIndex}`] === choice
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
            >
              {choice}
            </button>
          ))}
        </div>
      ) : //   ) : currentQuestion.type === "date" ? (
      //     <input
      //       type="date"
      //       name={`question-${currentQuestion.id}`}
      //       value={answers[`question-${currentQuestion.id}`] || ""}
      //       onChange={(event) =>
      //         setAnswers({
      //           ...answers,
      //           [`question-${currentQuestion.id}`]: event.target.value,
      //         })
      //       }
      //       className="block w-full border border-gray-400 rounded-lg py-2 px-4 mb-4"
      //     />
      null}
      <div className="flex justify-between">
        {currentQuestionIndex > 0 && (
          <button
            onClick={handleBackClick}
            className="text-blue-500 font-medium"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNextClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

const questions = [
  {
    id: 1,
    text: "How long have you been training?",
    subtitle: "",
    type: "multiple-choice",
    choices: ["Less than 1 Year", "1-3 Years", "3+ Years"],
  },
  {
    id: 2,
    text: "How many days per week do you prefer to train?",
    subtitle:
      "Since we're individualizing your training dose, this will simply condense or spread out the work.",
    type: "multiple-choice",
    choices: ["3x per week", "4x per week", "5x per week"],
  },
  {
    id: 3,
    text: "What are your training goals?",
    subtitle:
      "Powerlifting includes hypertrophy work designed to increase your max squat, bench, and deadlift. Size and Strength does the same and includes additional physique training. Muscle Growth is solely for physique development.",
    type: "multiple-choice",
    choices: ["Powerlifting", "Muscle Growth", "Size and Strength"],
  },
  {
    id: 4,
    text: "What training workload seems to result in the best progress for your Squat?",
    subtitle:
      "This is the number of hard sets completed via squats or other quad exercises.",
    type: "multiple-choice",
    choices: [
      "Low (5-8 sets per week)",
      "Moderate (9-11 sets per week)",
      "High (12-14 sets per week)",
      "I'm not sure!",
    ],
  },
  {
    id: 5,
    text: "What training workload seems to result in the best progress for your Bench Press?",
    subtitle:
      "This is the number of hard sets completed via bench presses or other chest exercises.",
    type: "multiple-choice",
    choices: [
      "Low (9-13 sets per week)",
      "Moderate (14-18 sets per week)",
      "High (19-23 sets per week)",
      "I'm not sure!",
    ],
  },
  {
    id: 6,
    text: "What training workload seems to result in the best progress for your Deadlift?",
    subtitle:
      "This is the number of hard sets completed via deadlifts or other glute/hamstring exercises.",
    type: "multiple-choice",
    choices: [
      "Low (5-7 sets per week)",
      "Moderate (8-10 sets per week)",
      "High (11-13 sets per week)",
      "I'm not sure!",
    ],
  },
  {
    id: 7,
    text: "Which of the below top sets is most appropriate for your Squat?",
    subtitle:
      "Consider A) how heavy loads need to be for your squat to feel practiced and B) whether heavy loads tend to fatigue you.",
    type: "multiple-choice",
    choices: [
      "5 reps w/ 3 reps in reserve",
      "2 reps w/ 2 reps in reserve",
      "1 rep w/ 1 reps in reserve",
      "I'm not sure!",
    ],
  },
  {
    id: 8,
    text: "Which of the below top sets is most appropriate for your Bench Press?",
    subtitle:
      "Consider A) how heavy loads need to be for your bench press to feel practiced and B) whether heavy loads tend to fatigue you.",
    type: "multiple-choice",
    choices: [
      "3 reps w/ 3 reps in reserve",
      "2 reps w/ 2 reps in reserve",
      "1 rep w/ 1 reps in reserve",
      "I'm not sure!",
    ],
  },
  {
    id: 9,
    text: "Which of the below top sets is most appropriate for your Deadlift?",
    subtitle:
      "Consider A) how heavy loads need to be for your deadlift to feel practiced and B) whether heavy loads tend to fatigue you.",
    type: "multiple-choice",
    choices: [
      "5 reps w/ 3 reps in reserve",
      "2 reps w/ 2.5 reps in reserve",
      "1 rep w/ 2 reps in reserve",
      "I'm not sure!",
    ],
  },
];
