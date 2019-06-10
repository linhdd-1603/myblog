import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeUpdateState {
  isNew: boolean;
}

export class EmployeeUpdate extends React.Component<IEmployeeUpdateProps, IEmployeeUpdateState> {
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
    values.hireDate = convertDateTimeToServer(values.hireDate);

    if (errors.length === 0) {
      const { employeeEntity } = this.props;
      const entity = {
        ...employeeEntity,
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
    this.props.history.push('/entity/employee');
  };

  render() {
    const { employeeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="myblogApp.employee.home.createOrEditLabel">
              <Translate contentKey="myblogApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="employee-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="employee-firstName">
                    <Translate contentKey="myblogApp.employee.firstName">First Name</Translate>
                  </Label>
                  <AvField id="employee-firstName" type="text" name="firstName" />
                  <UncontrolledTooltip target="firstNameLabel">
                    <Translate contentKey="myblogApp.employee.help.firstName" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="employee-lastName">
                    <Translate contentKey="myblogApp.employee.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="employee-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="employee-email">
                    <Translate contentKey="myblogApp.employee.email">Email</Translate>
                  </Label>
                  <AvField id="employee-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="employee-phoneNumber">
                    <Translate contentKey="myblogApp.employee.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="employee-phoneNumber" type="text" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="hireDateLabel" for="employee-hireDate">
                    <Translate contentKey="myblogApp.employee.hireDate">Hire Date</Translate>
                  </Label>
                  <AvInput
                    id="employee-hireDate"
                    type="datetime-local"
                    className="form-control"
                    name="hireDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeEntity.hireDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="salaryLabel" for="employee-salary">
                    <Translate contentKey="myblogApp.employee.salary">Salary</Translate>
                  </Label>
                  <AvField id="employee-salary" type="string" className="form-control" name="salary" />
                </AvGroup>
                <AvGroup>
                  <Label id="commissionPctLabel" for="employee-commissionPct">
                    <Translate contentKey="myblogApp.employee.commissionPct">Commission Pct</Translate>
                  </Label>
                  <AvField id="employee-commissionPct" type="string" className="form-control" name="commissionPct" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee" replace color="info">
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
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
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
)(EmployeeUpdate);
