import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { EditPage, Props, State } from './EditPage';
import { getRouterTestProps } from '../../../tests/utils/testRouteProps';
import { SubjectWithId } from '../../../store/types/Subjects';
import { WriteMode } from '../../../types/admin';
import {
    ExtendedEquationWithId,
    ExtendedEquation
} from '../../../store/types/Equations';
import EquationsList from '../EquationsList/EquationsList';

let routeProps, props: Props, wrapper: ShallowWrapper, component: EditPage;

function prepareTests(path: string, params: object = {}) {
    routeProps = getRouterTestProps(path, params);
    props = {
        ...routeProps,
        url: routeProps.match.url,
        addEquation: jest.fn(),
        addSubject: jest.fn(),
        addTopic: jest.fn(),
        deleteEquation: jest.fn(),
        fetchAllSubjects: jest.fn(),
        fetchTopics: jest.fn(),
        fetchEquation: jest.fn(),
        updateEquation: jest.fn(),
        subjects: [],
        equations: [],
        topics: []
    } as Props;
    wrapper = shallow(<EditPage {...props} />);
    component = wrapper.instance() as EditPage;
}

describe('<EditPage />', () => {
    describe('General', () => {
        beforeEach(() => {
            prepareTests('');
        });

        it('Should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('Should fetch subjects when mounted', () => {
            expect(props.fetchAllSubjects).toHaveBeenCalledTimes(1);
        });
        it('Should update state when explanation input typed in', () => {
            const value = 'Test equation explanation';
            const event = {
                target: { name: 'explanation', value: value }
            } as React.ChangeEvent<HTMLInputElement>;
            expect(component.state.explanation).toBe('');
            component.onSelectChange(event);
            expect(component.state.explanation).toBe(value);
        });
        it('Should update equation state', () => {
            const value = '2+2=4';
            const event = {
                target: { name: 'equation', value: value }
            } as React.ChangeEvent<HTMLInputElement>;
            expect(component.state.equation).toBe('');
            component.onSelectChange(event);
            expect(component.state.equation).toBe(value);
        });
        it('Should open "Add subject" dialog', () => {
            const lastItemValue = 'add_subject';
            const event = {
                target: { value: lastItemValue }
            } as React.ChangeEvent<HTMLSelectElement>;
            expect(component.state.subjectDialogState).toBeFalsy();
            component.onSelectChange(event, lastItemValue);
            expect(component.state.subjectDialogState).toBeTruthy();
        });
        it('Should open "Add topic" dialog', () => {
            const lastItemValue = 'add_topic';
            const event = {
                target: { value: lastItemValue }
            } as React.ChangeEvent<HTMLSelectElement>;
            expect(component.state.topicDialogState).toBeFalsy();
            component.onSelectChange(event, lastItemValue);
            expect(component.state.topicDialogState).toBeTruthy();
        });
        it('Should change subjectRef value', () => {
            const value = 'TestSubjectRef';
            const event = {
                target: { value: value, name: 'subjectRef' }
            } as React.ChangeEvent<HTMLSelectElement>;
            expect(component.state.subjectRef).toBe('');
            component.onSelectChange(event);
            expect(component.state.subjectRef).toBe(value);
        });
        it('Should change topicRef value', () => {
            const value = 'TestTopicRef';
            const event = {
                target: { value: value, name: 'topicRef' }
            } as React.ChangeEvent<HTMLSelectElement>;
            expect(component.state.topicRef).toBe('');
            component.onSelectChange(event);
            expect(component.state.topicRef).toBe(value);
        });
        it('Should fetch topics after choosing subject', () => {
            const value = 'TestSubjectRef';
            const subject: SubjectWithId = {
                id: value,
                name: 'testSubjectName'
            };
            component.props.subjects.push(subject);
            const event = {
                target: { value: value, name: 'subjectRef' }
            } as React.ChangeEvent<HTMLSelectElement>;
            component.onSelectChange(event, 'add_subject');
            expect(props.fetchAllTopics).toHaveBeenCalledTimes(1);
        });
    });

    describe('/add-equation case', () => {
        beforeEach(() => {
            prepareTests('/admin/add-equation');
        });
        it('Should switch mode to "Add"', () => {
            expect(component.state.mode).toBe(WriteMode.Add);
        });
        it('Should submit form and add equation', () => {
            wrapper
                .find('form')
                .at(0)
                .simulate('submit', { preventDefault: () => jest.fn() });
            expect(props.addEquation).toHaveBeenCalledTimes(1);
        });
    });

    describe('/edit-equation/:id case', () => {
        const idParam = 'testEquationId';
        beforeEach(() => {
            prepareTests('/admin/edit-equation/:id', { id: idParam });
        });
        it('Should switch mode to Edit', () => {
            expect(component.state.mode).toBe(WriteMode.Edit);
        });
        it('Should receive id param', () => {
            expect(component.state.equationId).not.toBeUndefined();
            expect(component.state.equationId).toBe(idParam);
        });
        it('Should fill inputs with equation data', () => {
            const testEquation: ExtendedEquation = {
                equation: '2+2=4',
                explanations: 'testExplanation',
                subjectRef: 'testSubjectRef',
                topicRef: 'testTopicRef'
            };
            const equationWithId = {
                ...testEquation,
                id: idParam
            } as ExtendedEquationWithId;
            wrapper.setProps({
                topics: [
                    {
                        id: 'testTopicRef',
                        name: 'testTopicName',
                        subjectRef: 'testSubjectRef'
                    }
                ],
                equations: [equationWithId]
            } as Props);
            expect(component.state).toMatchObject({
                ...testEquation,
                equationId: idParam
            });
        });
        it('Should update when submitting', () => {
            wrapper
                .find('form')
                .at(0)
                .simulate('submit', { preventDefault: () => jest.fn() });
            expect(props.updateEquation).toHaveBeenCalledTimes(1);
        });
    });
});
