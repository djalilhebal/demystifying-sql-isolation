import { ISimState } from '../core';

import Finishline from './Finishline';
import Racetrack from './Racetrack';
import Participant from './Participant';
import OmegaSpeech from './OmegaSpeech';

import './Viz.css';

const Viz = ({ simState }: { simState: ISimState }) => {
  const { participants } = simState.perspectives.referee;

  return (
    <svg
      className="viz"
      width="1920"
      height="1080"
      viewBox="40 0 500 250"
      version="1.1"
    >
      <g className="scene">

        <Racetrack />
        <Finishline />
        <OmegaSpeech texts={['Omega thought 1', 'Another omega huge thought']} />
        <g className="participants">
          {
            participants.map((participant) => (
              <Participant key={participant.id} {...participant} />
            ))
          }
        </g>
      </g>
    </svg>
  );
}

export default Viz;
