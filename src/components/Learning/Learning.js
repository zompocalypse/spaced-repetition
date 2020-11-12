import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import { Input, Label } from '../Form/Form';
import Button from '../Button/Button';

export default class Learning extends Component {
  state = {
    error: null,
    loading: true,
    nextWord: '',
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0,
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
        <section>
          <h2>Translate the word:</h2>
          <span className="next-word">{nextWord}</span>
          <form onSubmit={this.handleSubmit}>
            <div role="alert">{error && <p>{error}</p>}</div>
            <div>
              <Label htmlFor="learn-guess-input" className="input-label">
                What's the translation for this word?
              </Label>
              <Input
                ref={this.firstInput}
                id="learn-guess-input"
                name="guess"
                className="input-field"
                required
              />
            </div>
            <Button type="submit">Submit your answer</Button>{' '}
          </form>
        </section>
        <section>
          <p>Your total score is: {totalScore}</p>
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>
            You have answered this word incorrectly {wordIncorrectCount} times.
          </p>
        </section>
      </>
    );
  }
}
