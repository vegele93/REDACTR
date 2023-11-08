document.addEventListener('DOMContentLoaded', function () {
    const redactButton = document.getElementById('redactButton');
    const originalText = document.getElementById('originalText');
    const customReplacement = document.getElementById('customReplacement');
    const wordsToRedact = document.getElementById('wordsToRedact');
    const replacementCharacter = document.getElementById('replacementCharacter');
    const redactedOutput = document.getElementById('redactedText');
    const scannedWordsCount = document.getElementById('scannedWordsCount');
    const redactedWordsCount = document.getElementById('redactedWordsCount');
    const scrambledCharactersCount = document.getElementById('scrambledCharactersCount');
    const timeTaken = document.getElementById('timeTaken');

    replacementCharacter.addEventListener('change', function () {
        if (replacementCharacter.value === 'CUSTOM') {
            customReplacement.style.display = 'inline';
        } else {
            customReplacement.style.display = 'none';
        }
    });

    redactButton.addEventListener('click', function () {
        const text = originalText.value;
        const words = wordsToRedact.value.split(' ');
        let replaceChar = '';

        if (replacementCharacter.value === 'CUSTOM') {
            replaceChar = customReplacement.value;
        } else {
            replaceChar = replacementCharacter.value;
        }

        const startTime = performance.now(); // Start time for performance calculation

        const redactedText = redactWords(text, words, replaceChar);

        const endTime = performance.now(); // End time for performance calculation
        const timeElapsed = ((endTime - startTime) / 1000).toFixed(2); // Time taken in seconds

        redactedOutput.textContent = redactedText;
        scannedWordsCount.textContent = countWords(text);
        redactedWordsCount.textContent = words.length;
        scrambledCharactersCount.textContent = countScrambledCharacters(redactedText);
        timeTaken.textContent = timeElapsed + ' seconds';
    });

    function redactWords(text, words, replaceChar) {
        let redactedText = text;
        words.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            redactedText = redactedText.replace(regex, replaceChar.repeat(word.length));
        });
        return redactedText;
    }

    function countWords(text) {
        return text.split(/\s+/).length;
    }

    function countScrambledCharacters(text) {
        return text.replace(/\s/g, '').length;
    }
});
