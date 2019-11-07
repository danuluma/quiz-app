import { Rate } from 'antd'
import React, { Component, Fragment } from 'react'
import BottomProgressBar from '../components/BottomProgressBar'
import Button from '../components/Button'
import TopProgressBar from '../components/TopProgressBar'
import myQuizes from '../questions.json'
import './styles.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      questions: [],
      numberOfQuiz: 0,
      clicked: false,
      answered: false,
      correctCount: 0,
      answeredCount: 0,
      isCorrect: false,
      currQuiz: {
        category: '',
        type: '',
        difficulty: '',
        question: '',
        correctAnswer: '',
        options: [],
        incorrectAnswer: []
      }
    }
  }

  parseCurrentQuestion (quiz) {
    const correctAnswer = unescape(quiz.correct_answer)
    const incorrectAnswers = quiz.incorrect_answers.map(a => unescape(a))
    const quizObj = {}
    quizObj.category = unescape(quiz.category)
    quizObj.type = unescape(quiz.type)
    quizObj.difficulty = unescape(quiz.difficulty)
    quizObj.question = unescape(quiz.question)
    quizObj.correctAnswer = correctAnswer
    quizObj.incorrectAnswers = incorrectAnswers
    quizObj.options = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5)
    return quizObj
  }

  componentDidMount () {
    const currQuiz = this.parseCurrentQuestion(myQuizes[0])
    this.setState({ questions: [ ...myQuizes ], numberOfQuiz: myQuizes.length, currQuiz })
  }

  nextQuestion () {
    this.setState(prevState => {
      const { currentIndex, numberOfQuiz, questions } = prevState
      if (currentIndex + 1 < numberOfQuiz) {
        const currQuiz = this.parseCurrentQuestion(questions[currentIndex + 1])
        return { currentIndex: prevState.currentIndex + 1, currQuiz, clicked: true, answered: false }
      }
    })
  }

  parseRating (difficulty) {
    switch (difficulty) {
      case 'hard':
        return 3
      case 'medium':
        return 2
      case 'easy':
        return 1
      default:
        return 0
    }
  }

  handleSelect (el) {
    const text = el.innerText
    const { currQuiz: { correctAnswer }, answered } = this.state

    if (text === correctAnswer && !answered) {
      this.setState(prevState => ({
        correctCount: prevState.correctCount + 1,
        answered: true,
        clicked: true,
        isCorrect: true,
        answeredCount: prevState.answeredCount + 1
      }))
    } else if (!answered) {
      this.setState(prevState => ({
        answered: true,
        clicked: true,
        isCorrect: false,
        answeredCount: prevState.answeredCount + 1
      }))
    }
  }

  render () {
    const { currentIndex, numberOfQuiz, currQuiz, answered, currQuiz: { options }, isCorrect, clicked, answeredCount, correctCount } = this.state
    const isCorrectOrWrong = clicked && isCorrect ? 'Correct!' : 'Sorry!'
    const currScore = (correctCount / answeredCount) * 100 || 0
    const remQuiz = numberOfQuiz - answeredCount
    const maxScore = ((correctCount + remQuiz) / numberOfQuiz) * 100
    const hideThis = answered ? '' : 'hidden'
    const finalScoreText = remQuiz > 0 ? isCorrectOrWrong : `Final Score: ${parseInt(currScore)}%`
    const hideIfExtra = options.length === 2 ? 'hidden' : ''
    return (
      <Fragment>
        <TopProgressBar current={answeredCount} total={numberOfQuiz} />
        <div className='container'>
          <div className='header'>
            <h1>Question {currentIndex + 1 } of {numberOfQuiz}</h1>
            <h4>{currQuiz.category}</h4>
            <Rate
              className='rating'
              count={3}
              value={this.parseRating(currQuiz.difficulty)}
              defaultValue={0}
              disabled
            />
          </div>
          <p className='quiz-text'>
            {currQuiz.question}
          </p>
          <div className='btn-group'>
            <Button pos={1} disabled={answered} text={options[0]} onClick={e => this.handleSelect(e.target)} />
            <Button pos={2} disabled={answered} text={options[1]} onClick={e => this.handleSelect(e.target)} />
          </div>
          <div className={`btn-group ${hideIfExtra}`}>
            <Button pos={3} disabled={answered} text={options[2]} onClick={e => this.handleSelect(e.target)} />
            <Button pos={4} disabled={answered} text={options[3]} onClick={e => this.handleSelect(e.target)} />
          </div>
          <span className={hideThis}>
            <h1>{finalScoreText}</h1>
            <Button
              disabled={!answered || remQuiz === 0}
              text='Next Question'
              onClick={() => this.nextQuestion()}
            />
          </span>
          <div className='progress-text' >
            <span>Score: {parseInt(currScore)}%</span>
            <span>Max Score: {parseInt(maxScore)}%</span>
          </div>
          <span className='bottomBar'>
            <BottomProgressBar current={answeredCount} correctAns={correctCount} total={numberOfQuiz} />
          </span>
        </div>
      </Fragment>
    )
  }
}
export default Home
