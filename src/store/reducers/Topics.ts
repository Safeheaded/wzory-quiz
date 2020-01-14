import { TopicsState, TopicsActionTypes } from '../types/Topics';
import {
    FETCH_ALL_TOPICS_SUCCESS,
    ADD_TOPIC_ERROR,
    ADD_TOPIC_SUCCESS,
    FETCH_TOPICS_SUCCESS,
    UPDATE_TOPIC_SUCCESS,
    DELETE_TOPIC,
    DELETE_TOPIC_SUCCESS
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
        case UPDATE_TOPIC_SUCCESS:
            const updatedTopics = state.topics.map(topic => {
                if (topic.id === action.payload.id) {
                    return action.payload;
                }
                return topic;
            });
            return { ...state, topics: updatedTopics };
        case DELETE_TOPIC_SUCCESS:
            const updatedTopic = state.topics.filter(
                topic => topic.id !== action.payload
            );
            return { ...state, topics: updatedTopic };
    }
    return state;
};

export default TopicsReducer;
