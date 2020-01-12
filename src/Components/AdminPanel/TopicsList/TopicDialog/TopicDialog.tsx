import React, { Component } from 'react';
import EditDialog from '../../EditList/EditDialog/EditDialog';
import { ExtendedTopicWithId } from '../../../../store/types/Topics';
import { withRouter } from 'react-router-dom';

class TopicDialog extends EditDialog<ExtendedTopicWithId> {}

export default withRouter(TopicDialog);
