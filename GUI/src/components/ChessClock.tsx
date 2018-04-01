import * as React from "react";

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}
export interface ChessClockProps {

}

interface ChessClockState {
  time: Time
}

export default class ChessClock extends React.Component<ChessClockProps, ChessClockState> {
  private startTime: number;

  constructor(props: ChessClockProps) {
    super(props);
    this.startTime = new Date().getTime();
    this.handleIntervalTick = this.handleIntervalTick.bind(this);
    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
    setInterval(this.handleIntervalTick, 1000);
  }

  handleIntervalTick() {
    let secondsPassed = Math.round((new Date().getTime() - this.startTime) / 1000);
    let hours = Math.floor(secondsPassed / 3600);
    let minutes = Math.floor((secondsPassed - hours * 60) / 60);
    let seconds = Math.floor((hours * 60 + minutes * 60) - secondsPassed);

    this.setState({
      time: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      }
    })
  }

  componentWillReceiveProps(nextProps: ChessClockProps) {

  }

  render() {
    return (
      <div>
        {this.state.time.hours} :
        {this.state.time.minutes} :
        {this.state.time.seconds}
      </div>
    );
  }
}
