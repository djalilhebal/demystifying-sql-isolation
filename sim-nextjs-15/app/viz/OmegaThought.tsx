import ThoughtIcon from "./ThoughtIcon";
import ThoughtBubble from "./ThoughtBubble";
import MultilineText from "./MultilineText";

const OmegaThought = ({ texts }: { texts: string[] }) => {
    return (
        <g className="thought">
            <ThoughtIcon />
            <ThoughtBubble />
            <MultilineText texts={texts} />
        </g>
    );
}

export default OmegaThought;
