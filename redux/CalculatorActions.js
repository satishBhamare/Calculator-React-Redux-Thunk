import { Eval, Operation } from '../Eval';

export const UpdateFirstOperand = (operand) => {
    return {
        type: 'UpdateFirstOperand',
        firstOperand: operand
    }
}

export const UpdateTotal = (total) => {
    return {
        type: 'UpdateTotal',
        total: total
    }
}

export const UpdatePressedDigit = (digit) => {
    return {
        type: 'UpdatePressedDigit',
        pressedDigit: digit
    }
}

export const UpdateSelectedOperation = (operation) => {
    return {
        type: 'UpdateSelectedOperation',
        selectedOperation: operation
    }
}

export const UpdateTotalOperation = (operation) => {
    return {
        type: 'UpdateTotalOperation',
        totalOperation: operation
    }
}

export const Reset = () => {
    return {
        type: 'Reset'
    }
}

export const ClearDigit = (clearDigit) => {
    return {
        type: 'ClearDigit',
        clearDigit: clearDigit
    }
}

export const UpdateSecondOperandAndCalculateResult = (digit) => {
    return function (dispatch, getState) {
        Eval[Operation(getState().selectedOperation)](getState().firstOperand, digit)
            .then((total) => dispatch(UpdateTotal(total)))
            .then(dispatch(Reset()))
    }
}
