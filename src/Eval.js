export const Eval = {
    add: function(firstOperand, secondOperand) {
            return new Promise((resolve) => resolve(eval(`${firstOperand} + ${secondOperand}`)))
        },
    substract: function(firstOperand, secondOperand) {
        return new Promise((resolve) => resolve(eval(`${firstOperand} - ${secondOperand}`)))
    },
    multiply: function(firstOperand, secondOperand) {
        return new Promise((resolve) => resolve(eval(`${firstOperand} * ${secondOperand}`)))
    },
    divide: function(firstOperand, secondOperand) {
        return new Promise((resolve) => resolve(eval(`${firstOperand} / ${secondOperand}`)))
    }
}

export const Operation = (operation) => {
    switch (operation) {
        case '+': return 'add';
        case '-': return 'substract';
        case '*': return 'multiply';
        case '/': return 'divide';
        default: return false;
    }
}
