// Core
import React, { Component, Fragment, createRef, ErrorMessage } from "react";
import cx from "classnames";
import { getUniqueID } from "../../../instruments";

import {
  Icon,
  Button,
  Radio,
  DatePicker,
  Upload,
  Checkbox,
  Select,
  Form,
  Input,
  Steps
} from "antd";

// Core
import { api } from "../../../API";
// Actions
import { questionnaireActions } from "../../../bus/questionnaire/actions";

// Instruments
import Styles from "./styles.m.css";
import { getWizardFormValidation } from "../../../bus/forms/shapes";
import { Form as FormikForm, Field, Formik } from "formik";

import "antd/lib/steps/style/css";
import { object } from "yup";

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

function Fieldset(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.name}>{props.label}</label>
      <Field {...props} />
      <ErrorMessage name={props.name} component="div" className="error" />
    </React.Fragment>
  );
}

export class QuestionnaireForm extends Component {
  formikForm = createRef();

  state = {
    questionnaire: {},
    validation: [],
    current: 0,
    formData: {}
  };

  componentDidMount() {
    this._fetchQuestionnaireAsync();
  }

  _fetchQuestionnaireAsync = async () => {
    try {
      //this._setPostsFetchingState(true);

      const questionnaire = await api.questionnaire.fetchQuestionnaire();
      const validation = getWizardFormValidation(questionnaire);

      this.setState(prevState => ({
        ...prevState,
        questionnaire,
        validation: validation.schema,
        formData: validation.shape
      }));

      questionnaireActions.fillQuestionnaire(questionnaire);
    } catch (error) {
      console.error(error);
    } finally {
      // this._setPostsFetchingState(false);
    }
  };

  handleChange = event => {
    const target = event.target;
    const value =
      target.type === "checkbox" || target.type === "radio" ? target.checked : target.value;
    const name = target.name;
    event.persist();
    this.setState(prevState => ({
      formData: {
        ...prevState,
        [name]: value
      }
    }));
  };

  next = values =>
    this.setState(state => ({
      current: state.current + 1
    }));

  prev = () =>
    this.setState(state => ({
      current: Math.max(state.current - 1, 0)
    }));

  handleSubmit = values => {
    const { children, onSubmit } = this.props;
    const { current } = this.state;
    const isLastPage = current === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    }
    // this.next(values);
  };

  render() {
    const { questionnaire, validation, formData, current } = this.state;
    const { isFetching } = this.props;
    const stepsCount = questionnaire.tabCount;
    const isLastPage = current === stepsCount - 1;
    const steps = [];

    for (let step = 0; step < stepsCount; step++) {
      if (step === current) {
        steps.push({
          description: "In Progress"
        });
      } else {
        steps.push({
          description: step < current ? "Finished" : "Waiting"
        });
      }
    }

    return (
      <Fragment>
        {//&& !formData && !validation[current]
        !questionnaire.id ? (
          <div>Loading...</div>
        ) : (
          <section className={Styles.questionnaire}>
            <div className={Styles.leftBar}>
              <Steps current={current} direction="vertical" size="big">
                {steps.map(step => (
                  <Step description={step.description} key={getUniqueID()} />
                ))}
              </Steps>
            </div>
            <div className={Styles.rightBar}>
              <div className={Styles.wizard}>
                <Formik
                  ref={this.formikForm}
                  enableReinitialize={false}
                  // resetForm: (nextValues?: Values) => void
                  initialValues={formData}
                  validationSchema={object().shape(validation[current])}
                  onSubmit={this.handleSubmit}
                  render={formikProps => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit
                    } = formikProps;

                    const centeredWrapperStyle = cx(Styles.wrapper, {
                      [Styles.disabledInput]: isFetching
                    });

                    const nextBtnMessage = isFetching ? "Loading..." : "Go forward";
                    const prevBtnMessage = isFetching ? "Loading..." : "Go back";
                    const submitBtnMessage = isFetching ? "Loading..." : "Submit";

                    const pages = questionnaire.pageAnswers;

                    return (
                      <FormikForm className={Styles.form} onSubmit={handleSubmit}>
                        <div className={centeredWrapperStyle}>
                          {pages.map(page => {
                            return (
                              <div
                                className={cx(Styles.wizardPage, {
                                  [Styles.show]: page.pageNumber - 1 === current
                                })}
                                key={getUniqueID()}
                              >
                                {page.questionModelAnswers.map(group => {
                                  return (
                                    <section className={Styles.fieldsGroup} key={group.id}>
                                      <h2>{group.questionModel.name}</h2>

                                      {group.questionAnswers.map(questionAnswer => {
                                        const question = questionAnswer.question;
                                        return (
                                          <div key={question.id}>
                                            <FormItem
                                              label={question.label}
                                              labelCol={{ span: 10 }}
                                              wrapperCol={{ span: 12 }}
                                            >
                                              <Field
                                                name={"question" + question.id}
                                                type={question.type || undefined}
                                                options={question.options || undefined}
                                                component={
                                                  stringToComponentMapper[question.element]
                                                }
                                                label={question.label}
                                                placeholder={question.label || undefined}
                                                // {stringToComponentMapper[props.element]}
                                                // onChange={this.handleChange}
                                              />
                                            </FormItem>
                                          </div>
                                        );
                                      })}
                                    </section>
                                  );
                                })}
                              </div>
                            );
                          })}
                          <div className="buttons">
                            {current > 0 && (
                              <Button
                                disabled={isFetching}
                                htmlType="submit"
                                type="primary"
                                onClick={() => this.prev()}
                              >
                                <Icon type="left" />
                                {prevBtnMessage}
                              </Button>
                            )}

                            {!isLastPage && (
                              <Button
                                disabled={isFetching}
                                htmlType="submit"
                                type="primary"
                                onClick={() => this.next()}
                              >
                                {nextBtnMessage}
                                <Icon type="right" />
                              </Button>
                            )}
                            {isLastPage && (
                              <Button disabled={isSubmitting} htmlType="submit" type="primary">
                                {submitBtnMessage}
                              </Button>
                            )}
                          </div>
                        </div>
                      </FormikForm>
                    );
                  }}
                />
              </div>
            </div>
          </section>
        )}
      </Fragment>
    );
  }
}

const InputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <Input {...field} {...props} />
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

const RadioGroupComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <RadioGroup {...field} {...props} defaultValue={0}>
      {props.radios}
    </RadioGroup>
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

const SelectComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <Select {...field} {...props}>
      {props.options.map(option => {
        return (
          <Option key={getUniqueID()} value={option}>
            {option}
          </Option>
        );
      })}
    </Select>
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

const DatePickerComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <DatePicker {...field} {...props} format="YYYY-MM-DD HH:mm:ss" />
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

const UploadComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <Upload {...field} {...props}>
      <Button>
        <Icon type="upload" /> Click to Upload
      </Button>
    </Upload>
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

const stringToComponentMapper = {
  input: InputComponent,
  radio: RadioGroupComponent,
  select: SelectComponent,
  date: DatePickerComponent,
  file: UploadComponent
};
