import SpeechIcon from "./SpeechIcon";
import SpeechBubble from "./SpeechBubble";
import MultilineText from "./MultilineText";

const OmegaSpeech = ({ texts }: { texts: string[] }) => {
    return (
        <g className="speech">
            <SpeechIcon />
            <SpeechBubble />
            <MultilineText texts={texts} />
        </g>
    )
}

export default OmegaSpeech;
