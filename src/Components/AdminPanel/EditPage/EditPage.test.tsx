import React from 'react';
import { shallow } from 'enzyme';
import { EditPage, Props } from './EditPage';
import { getRouterTestProps } from '../../../tests/utils/testRouteProps';

const routeProps = getRouterTestProps('/admin/add-equation', {});
const props = {
    ...routeProps,
    url: routeProps.match.url,
    addEquation: jest.fn(),
    addSubject: jest.fn(),
    addTopic: jest.fn(),
    deleteEquation: jest.fn(),
    fetchAllSubjects: jest.fn(),
    fetchAllTopics: jest.fn(),
    fetchEquation: jest.fn(),
    updateEquation: jest.fn(),
    subjects: [],
    equations: [],
    topics: []
} as Props;

describe('<EditPage /> general tests', () => {
    it('Should match snapshot', () => {
        const wrapper = shallow(<EditPage {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
