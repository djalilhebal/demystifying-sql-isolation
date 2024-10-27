import { IGameState } from '../common';
import FinishLine from './finishline';
import Racetrack from './racetrack';
import Participant from './participant';
import OmegaSpeech from './OmegaSpeech';

import './viz.css';

const Viz = ({ gameState }: { gameState: IGameState }) => {
  const { participants } = gameState;

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
        <FinishLine />
        <OmegaSpeech />
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
