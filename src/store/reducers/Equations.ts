import { EquationsState, EqActionTypes } from '../types/Equations';
import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR
} from '../constants/Equations';

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
        case ADD_EQUATION_ERROR:
            console.log(action.payload);
    }
    return state;
};

export default EquationsReducer;
