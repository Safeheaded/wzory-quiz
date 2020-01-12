import React, { Component } from 'react';
import EditDialog from '../../EditList/EditDialog/EditDialog';
import { SubjectWithId } from '../../../../store/types/Subjects';
import { withRouter } from 'react-router-dom';

class SubjectDialog extends EditDialog<SubjectWithId> {}

export default withRouter(SubjectDialog);
