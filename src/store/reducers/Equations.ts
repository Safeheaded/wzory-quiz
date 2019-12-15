import { EquationsState, EqActionTypes } from '../types/Equations';
import { ADD_EQUATION, ADD_EQUATION_SUCCESS } from '../constants/Equations';

const initState: EquationsState = { equations: [] };

const EquationsReducer = (
    state: EquationsState = initState,
    action: EqActionTypes
): EquationsState => {
    switch (action.type) {
        case ADD_EQUATION_SUCCESS:
            const equations = [...state.equations, action.payload];
            return {
                ...state,
                equations
            };
    }
    return state;
};

export default EquationsReducer;
