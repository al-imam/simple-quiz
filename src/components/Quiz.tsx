import React, { useEffect, useState } from "react";
import arrow from "./arrow.svg";
import question from "./question.svg";
import classes from "./quiz.module.css";

interface QuestionS {
  response_code: number;
  results: {
    category: string;
    type: boolean;
    difficulty: string;
    question: string;
    correct_answer: boolean;
    incorrect_answers: string[];
  }[];
}

function decode(str: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;

  return txt.value;
}

const Quiz: React.FunctionComponent = () => {
  const [q, setQ] = useState<null | QuestionS>(null);
  const [ani, setAni] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&category=18&type=boolean")
      .then((res) => res.json())
      .then(setQ);
  }, []);

  const handler = () => {
    setAni((a) => !a);
    fetch("https://opentdb.com/api.php?amount=1&category=18&type=boolean")
      .then((res) => res.json())
      .then(setQ);
  };

  const questionText = q?.results[0].question ?? "";

  return (
    <>
      <div
        className={`${classes.quiz} ${ani ? classes.animate : ""}`}
        onAnimationEnd={() => setAni(false)}
      >
        <img className={classes.svg} src={question} alt="?" />
        <div className={classes.question}>
          <span>Q.</span>
          <span>{decode(questionText)}</span>
        </div>
        <div className={classes.bgroup}>
          <button className={classes.button}>True</button>
          <button className={classes.button}>False</button>
        </div>
      </div>
      <button className={classes.arrow} onClick={handler}>
        <img src={arrow} alt="?" />
      </button>
    </>
  );
};

export default Quiz;
