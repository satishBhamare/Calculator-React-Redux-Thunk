import React, { Component } from 'react';
import Digit from './Digit';
import { Eval, Operation } from '../Eval';
import './Calculator.css';
import {
    UpdateFirstOperand,
    UpdateSecondOperandAndCalculateResult,
    UpdateTotal,
    UpdatePressedDigit,
    UpdateSelectedOperation,
    UpdateTotalOperation,
    Reset,
    ClearDigit } from '../redux/CalculatorActions';
import { connect } from 'react-redux';

class Calculator extends Component {

    digitPressed = (digit) => {
        let pressedDigit = this.props.clearDigit ? digit : (this.props.pressedDigit + digit);
        let totalOperation = this.props.totalOperation;

        this.props.updatePressedDigit(pressedDigit);
        this.props.ClearDigit(false);
        this.props.updateTotalOperation(totalOperation + digit);
    }

    reset = () => {
        this.props.reset();
    }

    operationSelected = (operation) => {
        if(operation === 'clear' || (this.props.firstOperand === '' && operation === '=')){
            this.props.reset();
            return;
        }
        const digit = this.props.pressedDigit;
        let totalOperation = this.props.totalOperation;

        //if calculator has 1+2+ pressed
        //and let's say, '-', is pressed
        //then the calculator should update operation to 1+2-
        if(Operation(totalOperation.slice(-1))) {
            totalOperation = totalOperation.slice(0, -1);
        }
        this.props.updateTotalOperation((digit==''?this.props.total:'') + totalOperation + operation);

        //+,-,*,/
        if(operation !== '=') {

            //if calculator was empty and a digit, say 1, is pressed
            //and an operation, say '+', was pressed
            //in this case, 1 should be considered as first operand
            if(this.props.firstOperand === ''){
                this.props.updateSelectedOperation(operation);
                this.props.updateFirstOperand((this.props.selectedOperation ? this.props.selectedOperation : '') + (digit==''?this.props.total:'')  + digit);
                this.props.ClearDigit(true);
            }
            //if calculator has 1+2 pressed,
            //and again an operation is pressed, say '-', then calculator will have 1+2-
            //in this case, 1+2 should be evaluated as a first operand
            //so, 3 will be the first operand
            //so for input, 1+2-2, the total will be 3-2 = 1
            else {
                Eval[Operation(this.props.selectedOperation)](this.props.firstOperand, digit)
                    .then((accumulator)=> {
                        this.props.updateSelectedOperation(operation);
                        this.props.updateFirstOperand(accumulator);
                        this.props.ClearDigit(true);
                    })
            }
        }
        else {
            this.props.updateSecondOperandAndCalculateResult(digit);
        }
    }

    render(){
        let digit = this.props.digits.map((digitArr, index) =>
            <li key={index} style={{'listStyleType':'none'}}>
                {
                    digitArr.map((digit) => (
                        <Digit digit={digit} digitPressed={(isNaN(digit) && digit != '.')?this.operationSelected:this.digitPressed} />
                    ))
                }
            </li>
        );

        return(
            <div className="Calculator">
                <div className="Result">
                    <div className="Operations">{this.props.totalOperation}</div>
                    <div className="Total">{this.props.total}</div>
                </div>
                <ul className="DigitPad">
                    {digit}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pressedDigit: state.pressedDigit,
        digits: state.digits,
        selectedOperation: state.selectedOperation,
        firstOperand: state.firstOperand,
        secondOperand: state.secondOperand,
        total: state.total,
        clearDigit: state.clearDigit,
        totalOperation: state.totalOperation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFirstOperand: (operand)=>{ dispatch(UpdateFirstOperand(operand)) },
        updateSecondOperandAndCalculateResult: (digit)=>{ dispatch(UpdateSecondOperandAndCalculateResult(digit))},
        updateTotal: (total)=>{ dispatch(UpdateTotal(total)) },
        updatePressedDigit: (digit)=>{ dispatch(UpdatePressedDigit(digit)) },
        updateSelectedOperation: (operation)=>{ dispatch(UpdateSelectedOperation(operation)) },
        updateTotalOperation: (totalOperation)=>{ dispatch(UpdateTotalOperation(totalOperation)) },
        reset: () => { dispatch(Reset())},
        ClearDigit: (clearDigit)=>{ dispatch(ClearDigit(clearDigit)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
