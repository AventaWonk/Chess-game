import * as React from "react";

const getTimeBySeconds = (seconds: number) => {
  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds / 60)) % 60,
    seconds: seconds % 60,
  }
}

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ChessClockProps {
  isPaused: boolean;
  timeLimit?: number;
  onTimeLeftEvent: () => void;
}

interface ChessClockState {
  time: Time
}

export default class ChessClock extends React.Component<ChessClockProps, ChessClockState> {
  private startTime: number;
  private intervalId: NodeJS.Timer;

  constructor(props: ChessClockProps) {
    super(props);
    this.startTime = new Date().getTime();
    this.handleIntervalTick = this.handleIntervalTick.bind(this);
    this.intervalId = setInterval(this.handleIntervalTick, 1000);
    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
  }

  handleIntervalTick() {
    let seconds;
    if (this.props.timeLimit) {
      seconds = Math.round((this.startTime + this.props.timeLimit * 60 * 1000 - new Date().getTime()) / 1000);

      if (seconds < 0) {
        clearInterval(this.intervalId);
      }
    } else {
      seconds = Math.round((new Date().getTime() - this.startTime) / 1000);
    }

    this.setState({
      time: getTimeBySeconds(seconds)
    })
  }

  componentWillReceiveProps(nextProps: ChessClockProps) {
    if (this.props.isPaused != nextProps.isPaused) {
      if (nextProps.isPaused == true) {
        clearInterval(this.intervalId);
      } else {
        this.intervalId = setInterval(this.handleIntervalTick, 1000);
      }
    }
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
