import React from 'react';
import './WordList.css';

export default function WordList(props) {
  return (
    <>
      <li className="wordlist-flex">
        <h4 className="flex-left">{props.word.original}</h4>
        <div className="flex-right">
          <p>correct answer count: {props.word.correct_count}</p>
          <p>incorrect answer count: {props.word.incorrect_count}</p>
        </div>
      </li>
      <hr />
    </>
  );
}
