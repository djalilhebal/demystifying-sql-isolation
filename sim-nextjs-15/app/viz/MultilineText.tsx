const MultilineText = ({ texts }: { texts: string[] }) => {
    return (
        <text>
            {
                texts.map((text, index) => (
                    <tspan key={index} x="0" dy="1.2em">{text}</tspan>
                ))
            }
        </text>
    );
}

export default MultilineText;
