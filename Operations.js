import React from 'react';

const Operations = (props) => {
    return(
        <button onClick={() => props.operationSelected(props.operation)}>
            {props.operation}
        </button>
    )
}

export default Operations;
