import React from "react";
import question from "./question.svg";
import classes from "./quiz.module.css";

const Quiz: React.FunctionComponent = () => {
  return (
    <div className={classes.quiz}>
      <img className={classes.svg} src={question} alt="?" />
      <div className={classes.question}>
        <span>Q.</span>
        <span>laksamipur polytechnic institute have more then 65 teacher?</span>
      </div>
      <div className={classes.bgroup}>
        <button className={classes.button}>True</button>
        <button className={classes.button}>False</button>
      </div>
    </div>
  );
};

export default Quiz;
