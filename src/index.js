function isOpeningBracket(bracket, map) {
    return !!map[bracket];
}

function isClosingBracket(bracket, map) {
    return Object.values(map).includes(bracket);
}

function isMatching(bracket, prevBracket, map) {
    if (typeof bracket === 'undefined' || typeof prevBracket === 'undefined')
        return false;
    return map[prevBracket] === bracket;
}

module.exports = function check(str, bracketsConfig) {
    const brackets = [];
    const bracketsMap = bracketsConfig.reduce((acc, value) => {
        acc[value[0]] = value[1];
        return acc;
    }, {});

    for (let char of str) {
        const openingBracket = isOpeningBracket(char, bracketsMap);
        const closingBracket = isClosingBracket(char, bracketsMap);
        if (openingBracket && closingBracket) {
            const prevBracket = brackets[brackets.length-1];
            if (isMatching(char, prevBracket, bracketsMap))
                brackets.pop();
            else
                brackets.push(char);
        } else if (openingBracket) {
            brackets.push(char);
        } else if (closingBracket) {
            const prevBracket = brackets.pop();
            if (!isMatching(char, prevBracket, bracketsMap))
                return false;
        } else {
            // ignore other characters
        }
    }
    return brackets.length === 0;
}
