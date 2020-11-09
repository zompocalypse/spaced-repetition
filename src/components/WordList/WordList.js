import React from 'react';

export default function WordList(props) {
  console.log(props);
  return (
    <li>
      <h4>{props.word.original}</h4>
      <div>
        <span>correct answer count: {props.word.correct_count}</span>
        <span>incorrect answer count: {props.word.incorrect_count}</span>
      </div>
    </li>
  );
}
