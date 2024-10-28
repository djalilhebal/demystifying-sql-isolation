import { generateThoughts, IParticipant } from "../common";
import Hare from "./hare";
import OmegaThought from "./OmegaThought";
import Tortoise from "./tortoise";

const Participant = ({ id, animal, distance_covered, status, is_winner, worldModel }: IParticipant) => {
    const classNameList = [
        'participant-holder',
        status === 'inactive' ? 'participant-holder--inactive' : null,
        is_winner ? 'participant-holder--winner' : null,
    ].filter(Boolean).join(' ');

    const thoughtTexts = generateThoughts(worldModel!);

    return (
        <g
            className={classNameList}
            style={{
                '--distance-covered': `${distance_covered}px`,
            }}
        >
            <g className="participant">
                {animal === 'hare' ? <Hare /> : <Tortoise />}
            </g>

            {
                id > 2 ? null :
                <OmegaThought texts={thoughtTexts} />
            }
        </g>

    );
}

export default Participant;
