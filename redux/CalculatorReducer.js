const initialState = {
    pressedDigit: '',
    digits: [['1','2','3', 'clear'],['4','5','6', '+'],['7','8','9', '-'], ['0', '.', '*', '/'],['=']],
    selectedOperation: null,
    firstOperand: '',
    total: '0',
    clearDigit: false,
    totalOperation: ''
}

const CalculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UpdateFirstOperand':
            return Object.assign({}, state, {firstOperand: action.firstOperand});
        case 'UpdateTotal':
            return Object.assign({}, state, {total: action.total});
        case 'UpdatePressedDigit':
            return Object.assign({}, state, {pressedDigit: action.pressedDigit});
        case 'UpdateSelectedOperation':
            return Object.assign({}, state, {selectedOperation: action.selectedOperation});
        case 'UpdateTotalOperation':
            return Object.assign({}, state, {totalOperation: action.totalOperation});
        case 'Reset':
            return Object.assign({}, state, initialState);
        case 'ClearDigit':
            return Object.assign({}, state, {clearDigit: action.clearDigit});
        default:
            return state;
    }
}

export default CalculatorReducer;
