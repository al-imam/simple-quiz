import React, { useEffect, useState } from "react";
import arrowIcon from "./arrow.svg";
import questionIcon from "./question.svg";
import classes from "./quiz.module.css";

interface QuestionType {
  question: string;
  ans: boolean;
}

const firstQuestion: QuestionType = {
  question: "you know about future?",
  ans: false,
};

function setCSSVariable(color: string): void {
  document.documentElement.style.setProperty("--dark", `var(--${color}-dark)`);
  document.documentElement.style.setProperty(
    "--light",
    `var(--${color}-light)`
  );
}

function decode(str: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;

  return txt.value;
}

function fetchQuiz(
  callBack: React.Dispatch<React.SetStateAction<QuestionType>>
): void {
  fetch("https://opentdb.com/api.php?amount=1&category=18&type=boolean")
    .then((res) => res.json())
    .then((data) => {
      callBack({
        question: data.results[0].question,
        ans: data.results[0].correct_answer === "False" ? false : true,
      });
    });
}

const Quiz: React.FunctionComponent = () => {
  const [question, setQuestion] = useState<QuestionType>(firstQuestion);
  const [animation, setAnimation] = useState(false);
  const [answer, setAnswer] = useState<null | "true" | "false">(null);

  useEffect(() => {
    fetchQuiz(setQuestion);
  }, []);

  const handler = () => {
    setAnimation(true);
    setCSSVariable("p");
    setAnswer(null);
    fetchQuiz(setQuestion);
  };

  const handleSubmit = (ans: boolean): void => {
    if (question.ans === ans) {
      setAnswer("true");
      setCSSVariable("green");
    } else {
      setAnswer("false");
      setCSSVariable("red");
    }
  };

  const quizComputations = (): { class: string; text: string } => {
    const r = {
      class: classes.quiz,
      text: "",
    };

    if (animation) {
      r.class += " " + classes.animate;
    }

    if (answer != null) {
      if (answer === "true") {
        r.text = "correct answer ✅";
      } else {
        r.text = "wrong answer ❌";
      }
    }
    return r;
  };

  const computed = quizComputations();

  return (
    <>
      <div
        className={computed.class}
        onAnimationEnd={() => setAnimation(false)}
      >
        <img className={classes.svg} src={questionIcon} alt="?" />
        <div className={classes.question}>
          <span>Q.</span>
          <span>{decode(question.question)}</span>
        </div>
        <div className={classes.bgroup}>
          <button className={classes.button} onClick={() => handleSubmit(true)}>
            True
          </button>
          <button
            className={classes.button}
            onClick={() => handleSubmit(false)}
          >
            False
          </button>
        </div>
        <span className={classes.note}>{computed.text}</span>
      </div>
      <button className={classes.arrow} onClick={handler}>
        <img src={arrowIcon} alt="?" />
      </button>
    </>
  );
};

export default Quiz;
