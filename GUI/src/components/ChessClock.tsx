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

class ChessClock extends React.Component<ChessClockProps, ChessClockState> {

  constructor(props: ChessClockProps) {
    super(props);
    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
  }

  componentWillReceiveProps(nextProps: ChessClockProps) {

  }

  render() {
    return (
      <div>
        {this.state.time.hours} ::
        {this.state.time.minutes} ::
        {this.state.time.seconds}
      </div>
    );
  }
}
