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
  secondsLimit?: number;
  onTimeLeftEvent: () => void;
}

interface ChessClockState {
  time: Time
}

export default class ChessClock extends React.Component<ChessClockProps, ChessClockState> {
  private startTime: number;
  private intervalId: NodeJS.Timer;
  private lastTimeBeforePaused: number;

  constructor(props: ChessClockProps) {
    super(props);
    this.handleIntervalTick = this.handleIntervalTick.bind(this);
    console.log(props)
    if (!props.isPaused) {
      this.startTime = new Date().getTime();
      this.intervalId = setInterval(this.handleIntervalTick, 1000);
      this.state = {
        time: getTimeBySeconds(this.getTime(this.startTime)),
      }
    } else {
      this.state = {
        time: getTimeBySeconds(0),
      }
    }
  }

  componentWillReceiveProps(nextProps: ChessClockProps) {
    if (this.props.isPaused != nextProps.isPaused) {
      if (nextProps.isPaused == true) {
        clearInterval(this.intervalId);
        this.lastTimeBeforePaused = new Date().getTime();
      } else {
        if (!this.startTime) { // first start
          this.startTime = new Date().getTime();
          this.setState({
            time: getTimeBySeconds(this.getTime(this.startTime))
          })
        }

        this.intervalId = setInterval(this.handleIntervalTick, 1000);
        let pauseDuration = new Date().getTime() - this.lastTimeBeforePaused;
        this.startTime = this.startTime + pauseDuration;
      }
    }
  }

  getTime(milliseconds: number): number {
    let seconds;

    if (this.props.secondsLimit) {
      seconds = Math.round((this.startTime + this.props.secondsLimit * 1000 - milliseconds) / 1000);

      if (seconds < 0) {
        this.handleTimeLeft();
      }
    } else {
      seconds = Math.round((milliseconds - this.startTime) / 1000);
    }

    return seconds;
  }

  handleIntervalTick() {
    let currentMilliseconds = new Date().getTime();
    let currentTime = this.getTime(currentMilliseconds);
    let currentViewTime = getTimeBySeconds(currentTime);

    this.setState({
      time: currentViewTime,
    })
  }

  handleTimeLeft() {
    clearInterval(this.intervalId);
    this.props.onTimeLeftEvent();
  }

  render() {
    let display = "block";

    if (this.props.isPaused) {
      display = "none";
    }

    let style = {
      display: display,
    };

    return (
      <div style={style}>
        {this.state.time.hours}:
        {this.state.time.minutes}:
        {this.state.time.seconds}
      </div>
    );
  }
}
