import { TopicsState, TopicsActionTypes } from '../types/Topics';
import {
    FETCH_ALL_TOPICS_SUCCESS,
    ADD_TOPIC_ERROR,
    ADD_TOPIC_SUCCESS,
    FETCH_TOPICS_SUCCESS
} from '../constants/Topics';

const initState = { topics: [] };

const TopicsReducer = (
    state: TopicsState = initState,
    action: TopicsActionTypes
): TopicsState => {
    switch (action.type) {
        case FETCH_ALL_TOPICS_SUCCESS:
            return { ...state, topics: action.payload };
        case ADD_TOPIC_SUCCESS:
            return { ...state, topics: [...state.topics, action.payload] };
        case FETCH_TOPICS_SUCCESS:
            return { ...state, topics: action.payload };
    }
    return state;
};

export default TopicsReducer;
