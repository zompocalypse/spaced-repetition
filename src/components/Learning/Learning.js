import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import { Input, Label } from '../Form/Form';
import Button from '../Button/Button';

import './Learning.css';

export default class Learning extends Component {
  state = {
    error: null,
    loading: true,
    previousWord: '',
    nextWord: '',
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0,
    answer: '',
    isCorrect: null,
    guess: '',
  };

  static contextType = UserContext;

  componentDidMount() {
    return fetch(`${config.REACT_APP_API_BASE}/language/head`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setNextWord(res.nextWord);
        this.setAnswerCount(res.wordCorrectCount, res.wordIncorrectCount);
        this.setCurrentScore(res.totalScore);
      })
      .catch((e) => this.setState({ error: null }));
  }

  setNextWord = (nextWord) => {
    this.setState({
      nextWord,
    });
  };

  setAnswerCount = (wordCorrectCount, wordIncorrectCount) => {
    this.setState({
      wordCorrectCount,
      wordIncorrectCount,
    });
  };

  setCurrentScore = (totalScore) => {
    this.setState({
      totalScore,
    });
  };

  handleChange = (e) => {
    this.setState({
      guess: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${config.REACT_APP_API_BASE}/language/guess`, {
      method: 'POST',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        guess: this.state.guess,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          previousWord: this.state.nextWord,
          nextWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
          totalScore: res.totalScore,
          answer: res.answer,
          isCorrect: res.isCorrect,
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  renderFeedback = () => {
    if (this.state.isCorrect) {
      return (
        <>
          <h2 className="results">You were correct! :D</h2>
          <p className="user-results">
            The correct translation for <b>{this.state.previousWord}</b> was{' '}
            <b>{this.state.answer}</b> and you chose <b>{this.state.guess}</b>!
          </p>
        </>
      );
    } else {
      return (
        <>
          <h2 className="results">Good try, but not quite right :(</h2>
          <p className="user-results">
            The correct translation for <b>{this.state.previousWord}</b> was{' '}
            <b>{this.state.answer}</b> and you chose <b>{this.state.guess}</b>!
          </p>
        </>
      );
    }
  };

  handleNextWord = (event) => {
    event.preventDefault();

    fetch(`${config.REACT_APP_API_BASE}/language/head`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          answer: '',
          guess: '',
          isCorrect: null,
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const {
      error,
      nextWord,
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
    } = this.state;
    return (
      <>
        <section className="translate">
          {!this.state.answer ? (
            <>
              <h2>Translate the word:</h2>
              <h3 className="next-word">{nextWord}</h3>
            </>
          ) : (
            <>
              <div className="DisplayFeedback">{this.renderFeedback()}</div>
            </>
          )}
          <form onSubmit={this.handleSubmit}>
            <div role="alert">{error && <p>{error}</p>}</div>
            <div>
              <Label htmlFor="learn-guess-input" className="input-label">
                What's the translation for this word?
              </Label>
              <Input
                id="learn-guess-input"
                type="text"
                name="guess"
                className="input-field"
                value={this.state.guess}
                onChange={(event) => this.handleChange(event)}
                required
              />
            </div>
            {!this.state.answer ? (
              <Button type="submit" id="learn-submit-button">
                Submit your answer
              </Button>
            ) : (
              <Button
                type="button"
                id="learn-link-button"
                onClick={(event) => this.handleNextWord(event)}
              >
                Try another word!
              </Button>
            )}
          </form>
        </section>
        <section className="learner-feedback">
          <div className="DisplayScore">
            <p>Your total score is: {totalScore}</p>
          </div>
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>
            You have answered this word incorrectly {wordIncorrectCount} times.
          </p>
        </section>
      </>
    );
  }
}
