import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './job-history.reducer';
import { IJobHistory } from 'app/shared/model/job-history.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJobHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IJobHistoryUpdateState {
  isNew: boolean;
}

export class JobHistoryUpdate extends React.Component<IJobHistoryUpdateProps, IJobHistoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { jobHistoryEntity } = this.props;
      const entity = {
        ...jobHistoryEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/job-history');
  };

  render() {
    const { jobHistoryEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="myblogApp.jobHistory.home.createOrEditLabel">
              <Translate contentKey="myblogApp.jobHistory.home.createOrEditLabel">Create or edit a JobHistory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : jobHistoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="job-history-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="job-history-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startDateLabel" for="job-history-startDate">
                    <Translate contentKey="myblogApp.jobHistory.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="job-history-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.jobHistoryEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="job-history-endDate">
                    <Translate contentKey="myblogApp.jobHistory.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="job-history-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.jobHistoryEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="languageLabel" for="job-history-language">
                    <Translate contentKey="myblogApp.jobHistory.language">Language</Translate>
                  </Label>
                  <AvInput
                    id="job-history-language"
                    type="select"
                    className="form-control"
                    name="language"
                    value={(!isNew && jobHistoryEntity.language) || 'FRENCH'}
                  >
                    <option value="FRENCH">
                      <Translate contentKey="myblogApp.Language.FRENCH" />
                    </option>
                    <option value="ENGLISH">
                      <Translate contentKey="myblogApp.Language.ENGLISH" />
                    </option>
                    <option value="SPANISH">
                      <Translate contentKey="myblogApp.Language.SPANISH" />
                    </option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/job-history" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  jobHistoryEntity: storeState.jobHistory.entity,
  loading: storeState.jobHistory.loading,
  updating: storeState.jobHistory.updating,
  updateSuccess: storeState.jobHistory.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobHistoryUpdate);
