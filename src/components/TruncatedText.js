import React, { useState } from "react";

function truncateText(text, maxWords, isExpanded, toggleText) {
    if (text === null) {
        // Handle the case when the text is null
        return null;
    }

    const words = text.split(' ');

    if (words.length > maxWords && !isExpanded) {
        const truncatedWords = words.slice(0, maxWords);
        const truncatedText = truncatedWords.join(' ');

        // Check if the last word in the truncated text appears to be a URL
        const lastWord = truncatedWords[maxWords - 1];
        const isLastWordURL = lastWord && (lastWord.startsWith('http://') || lastWord.startsWith('https://'));

        // If the last word is a URL, expand the text to avoid cutting off URLs
        if (isLastWordURL) {
            toggleText(); // Expand the text
            return text;
        }

        return (
            <span>
                {truncatedText}
                <span
                    onClick={toggleText}
                    className='cursor-pointer text-blue-500'
                >
                    ...
                </span>
            </span>
        );
    }

    return text;
}

function TruncatedText({ text, maxWords }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {truncateText(text, maxWords, isExpanded, toggleText)}
            {isExpanded && (
                <span
                    onClick={toggleText}
                    className='cursor-pointer text-blue-500'
                    style={{ fontSize: '16px' }}
                ><br />
                    Show Less
                </span>
            )}
        </>
    );
}

export default TruncatedText;
