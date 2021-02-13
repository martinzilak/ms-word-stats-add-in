export const Unit = {
    LETTER: 'LETTER',
    LETTER_WITH_SPACES: 'LETTER_WITH_SPACES',
    WORD: 'WORD',
    PARAGRAPH: 'PARAGRAPH',
    PAGE: 'PAGE',
};

export const getValueByUnit = (
    unit,
    {
        letters = 0,
        lettersWithSpaces = 0,
        words = 0,
        paragraphs = 0,
        pages = 0,
    },
) => {
    if (unit === Unit.LETTER) {
        return letters;
    }
    if (unit === Unit.LETTER_WITH_SPACES) {
        return lettersWithSpaces;
    }
    if (unit === Unit.WORD) {
        return words;
    }
    if (unit === Unit.PARAGRAPH) {
        return paragraphs;
    }
    if (unit === Unit.PAGE) {
        return pages;
    }
    return 0;
};
