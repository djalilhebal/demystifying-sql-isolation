import { generateThoughts, IParticipant } from "../common";

import Hare from "./Hare";
import Tortoise from "./Tortoise";
import OmegaThought from "./OmegaThought";

const Participant = ({ id, animal, distance_covered, status, is_winner, worldModel }: IParticipant) => {
    const classNameList = [
        'participant-holder',
        status === 'inactive' ? 'participant-holder--inactive' : null,
        is_winner ? 'participant-holder--winner' : null,
    ].filter(Boolean).join(' ');

    const thoughtTexts = generateThoughts(worldModel!);
    const shouldShowThought = id === 1 || id === 2;

    return (
        <g
            className={classNameList}
            style={{
                '--distance-covered': `${distance_covered}px`,
            }}
        >
            <g className="participant">
                {animal === 'hare' ? <Hare /> : <Tortoise />}

                {shouldShowThought ? <OmegaThought texts={thoughtTexts} /> : null}
            </g>
        </g>

    );
}

export default Participant;
