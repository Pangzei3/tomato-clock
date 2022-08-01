import logo from './logo.svg';
import './App.css';
import React from 'react'



function BreakInterval(props) {
  function decreaseCounter() {
      if (props.breakInterval ===1) {
          return;
      }
      props.decreaseBreak();
  }
  function increaseCounter() {
      if (props.breakInterval ===60) {
          return;
      }
      props.increaseBreak();
  }
  return (
      <section>
          <h4 id="break-label">Break Length</h4>
          <section className="interval-container">
              <button id="break-decrement" onClick={decreaseCounter} disabled={props.isPlay === true ? "disabled" : ""}>Down</button>
              <p className="interval-length" id="break-length">{props.breakInterval}</p>
              <button id="break-increment" onClick={increaseCounter}disabled={props.isPlay === true ? "disabled" : ""}>Up</button>
          </section>
      </section>
  )
}
function SessionLength(props) {
  function decreaseCounter() {
      if (props.sessionLength ===1) {
          return;
      }
      props.decreaseSession();
  }
  function increaseCounter() {
      if (props.sessionLength ===60) {
          return;
      }
      props.increaseSession();
  }
  return (
      <section >
          <h4 id="session-label">Session Length</h4>
          <section className="interval-container">
              <button id="session-decrement" onClick={decreaseCounter} disabled={props.isPlay === true ? "disabled" : ""}>Down</button>
              <p className="interval-length" id="session-length">{props.sessionLength}</p>
              <button id="session-increment" onClick={increaseCounter} disabled={props.isPlay === true ? "disabled" : ""}>Up</button>
          </section>
      </section>
  )
}
class Timer extends React.Component {
  constructor() {
      super();
      this.state = {
          isSession: true,
          timerSecond: 0,
          intervalId: 0,
          isPlay: false
      };
      this.playTimer = this.playTimer.bind(this);
      this.decreaseTimer = this.decreaseTimer.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.displayTimer=this.displayTimer.bind(this);
      this.handleTimer=this.handleTimer.bind(this);
  }

  playTimer() {
      let intervalId = setInterval(this.decreaseTimer, 1000);
      this.props.onPlayStopTimer(true);
      this.setState({
          intervalId: intervalId
      })
  }

  decreaseTimer() {
      switch (this.state.timerSecond) {
          case 0:
              if (this.props.timerMinute === 0) {
                  this.audioBeep.play();
                  if (this.state.isSession) {
                      this.setState({
                          isSession: false,
                      })
                      this.props.toggleInterval(this.state.isSession)
                  } else {
                      this.setState({
                          isSession: true,
                      })
                      this.props.toggleInterval(this.state.isSessioin)
                  }
              } else {
                  this.props.updateTimerMinute()
                  this.setState({
                  timerSecond: 59
              })
              }
              
              break;
          default: 
              this.setState( (prevState) => {
                  return {
                      timerSecond: prevState.timerSecond -1
                  }
              })
      }
  }
  stopTimer() {
      clearInterval(this.state.intervalId);
      this.props.onPlayStopTimer(false);
  }
  handleTimer() {
      if (this.state.isPlay===false) {
          this.playTimer();
          this.setState({
              isPlay: true
          })
      } else {
          this.stopTimer();
          this.setState({
              isPlay: false
          })
      }
  }
  resetTimer() {
      this.stopTimer();
      this.props.resetTimer();
      this.props.onPlayStopTimer(false);
      this.setState({
          timerSecond: 0,
          isSession: true,
          isPlay: false
      });
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
  }
  
  displayTimer(){
      let minutes = this.props.timerMinute === 0 ? "00" : this.props.timerMinute < 10 ? "0" + this.props.timerMinute : this.props.timerMinute;
      let seconds = this.state.timerSecond === 0 ? "00" : this.state.timerSecond < 10 ? "0" + this.state.timerSecond : this.state.timerSecond;
      return minutes + ":" + seconds;
  }
  render () {
      return (
          <section>
              <section className="timer-container">
                  <h4 id="timer-label">{this.state.isSession === true ? "Session" : "Break"} </h4>
                  {/* <span className="timer" id="timer-left">{this.props.timerMinute}</span>
                  <span className="timer">:</span>
                  <span className="timer">{this.state.timerSecond === 0 ? "00" : this.state.timerSecond < 10 ? "0" + this.state.timerSecond : this.state.timerSecond} </span> */}
                  <div id="time-left" className="timer">{this.displayTimer()}</div>
              </section>
              <section className="timer-actions">
                  {/* <button onClick={this.playTimer} id="start_stop">Play</button>
                  <button onClick={this.stopTimer}>Stop</button> */}
                  <button onClick={this.handleTimer} id="start_stop">Play/Stop</button>
                  <button onClick={this.resetTimer} id="reset">Refresh</button>
              </section>
              <audio id="beep" preload="auto" ref={(audio)=>{this.audioBeep =audio}} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
          </section>
      )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      isPlay: false,
    }
    this.onIncreaseBreakLength = this.onIncreaseBreakLength.bind(this);
    this.onDecreaseBreakLength = this.onDecreaseBreakLength.bind(this);
    this.onIncreaseSessionLength = this.onIncreaseSessionLength.bind(this);
    this.onDecreaseSessionLength = this.onDecreaseSessionLength.bind(this);
    this.onToggleInterval = this.onToggleInterval.bind(this);
    this.onUpdateTimerMinute = this.onUpdateTimerMinute.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
    this.onPlayStopTimer=this.onPlayStopTimer.bind(this);
    
  }
  onIncreaseBreakLength() {
    this.setState((prevState) => {
      return {
        breakLength: prevState.breakLength + 1
      }
    })
  }
  onDecreaseBreakLength() {
    this.setState((prevState) => {
      return {
        breakLength: prevState.breakLength - 1
      }
    })
  }
  onIncreaseSessionLength() {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength + 1,
        timerMinute: prevState.sessionLength + 1
      }
    })
  }
  onDecreaseSessionLength() {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength - 1,
        timerMinute: prevState.sessionLength - 1
      }
    })
  }
  onUpdateTimerMinute() {
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1
      }
    })
  }
  onToggleInterval(isSession) {
    if (isSession) {
      this.setState({
        timerMinute: this.state.sessionLength
      })
    } else {
      this.setState({
        timerMinute: this.state.breakLength
      })
    }
  }
  onResetTimer() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25
    })
  }
  onPlayStopTimer(isPlay) {
    this.setState({
      isPlay: isPlay
    })
  }
  render() {
    return (
      <main>
        <h2>25+5 Clock</h2>
        <section className="interval-length-container">
          <BreakInterval breakInterval={this.state.breakLength} increaseBreak={this.onIncreaseBreakLength} decreaseBreak={this.onDecreaseBreakLength} isPlay={this.state.isPlay} />
          <SessionLength sessionLength={this.state.sessionLength} increaseSession={this.onIncreaseSessionLength} decreaseSession={this.onDecreaseSessionLength} isPlay={this.state.isPlay} />
        </section>
        <Timer timerMinute={this.state.timerMinute} breakLength={this.state.breakLength} updateTimerMinute={this.onUpdateTimerMinute} toggleInterval={this.onToggleInterval} resetTimer={this.onResetTimer} onPlayStopTimer={this.onPlayStopTimer}/>
        
      </main>
    );
  }

}


export default App;
