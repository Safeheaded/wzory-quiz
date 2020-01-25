import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { WriteMode } from '../../../types/admin';
import { ExtendedTopicWithId } from '../../../store/types/Topics';
import { SubjectWithId } from '../../../store/types/Subjects';

interface Props extends RouteComponentProps {
    mode?: WriteMode;
    items: SubjectWithId[] | ExtendedTopicWithId[];
}

export interface State {
    itemId: string;
    isDialogOpen: boolean;
    mode: WriteMode;
    value?: string;
}

export type Params = { id: string };

abstract class EditList<
    ExternalProps extends Props,
    ExternalState extends State
> extends Component<ExternalProps, ExternalState> {
    state = {
        itemId: '',
        isDialogOpen: false,
        mode: WriteMode.Edit
    } as ExternalState;

    protected baseComponentDidMount(fetch: Function) {
        fetch();
        this.setItemId();
    }

    abstract componentDidMount(): void;

    abstract componentDidUpdate(prevProps: Props, prevState: State): void;

    protected baseComponentDidUpdate(prevProps: Props) {
        if (prevProps.match.params !== this.props.match.params) {
            this.setItemId();
        }
        if (prevProps.mode !== this.props.mode) {
            this.setState({ isDialogOpen: !this.state.isDialogOpen });
            if (prevProps.mode === WriteMode.Add) {
                this.setState({ mode: WriteMode.Edit });
            } else {
                this.setState({ mode: WriteMode.Add });
            }
        }
    }

    protected setItemId() {
        if ((this.props.match.params as Params).id) {
            const itemId = (this.props.match.params as Params).id;
            this.setState({ itemId, isDialogOpen: true });
        } else {
            this.setState({ itemId: '', isDialogOpen: false });
        }
    }

    protected getItem<T extends ExtendedTopicWithId | SubjectWithId>(
        id: string
    ): T {
        return (this.props.items as T[]).find(item => item.id === id) as T;
    }

    abstract render(): JSX.Element;
}

export default EditList;
