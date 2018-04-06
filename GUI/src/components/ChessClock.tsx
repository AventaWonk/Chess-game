import * as React from "react";

const getTimeBySeconds = (seconds: number): Time => {
  if (seconds < 1) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

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
  initialTime?: number;
  secondsLimit?: number;
  onTimeLeftEvent: () => void;
  onTimerTickEvent: (currentSeconds: number) => void;
}

interface ChessClockState {
  time: Time
}

export default class ChessClock extends React.Component<ChessClockProps, ChessClockState> {
  private startTime: number;
  private intervalId: NodeJS.Timer;

  constructor(props: ChessClockProps) {
    super(props);
    if (!this.props.initialTime) {
      this.startTime = new Date().getTime();
    } else {
      this.startTime = this.props.initialTime;
    }
    this.handleIntervalTick = this.handleIntervalTick.bind(this);
    this.intervalId = setInterval(this.handleIntervalTick, 1000);
    this.state = {
      time: this.getViewTime(this.startTime),
    }
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

  getViewTime(milliseconds: number): Time {
    let seconds;

    if (this.props.secondsLimit) {
      seconds = Math.round((this.startTime + this.props.secondsLimit * 1000 - milliseconds) / 1000);

      if (seconds < 0) {
        this.handleTimeLeft();
      }
    } else {
      seconds = Math.round((milliseconds - this.startTime) / 1000);
    }

    return getTimeBySeconds(seconds);
  }

  handleIntervalTick() {
    let currentMilliseconds = new Date().getTime();
    let currentTime = this.getViewTime(currentMilliseconds);

    this.setState({
      time: currentTime,
    })
    this.props.onTimerTickEvent(currentMilliseconds);
  }

  handleTimeLeft() {
    clearInterval(this.intervalId);
    this.props.onTimeLeftEvent();
  }

  render() {
    return (
      <div>
        {this.state.time.hours}:
        {this.state.time.minutes}:
        {this.state.time.seconds}
      </div>
    );
  }
}
