// Core
import React, { Component } from "react";
import { Formik } from "formik";
import cx from "classnames";
import { Steps, Icon, Button } from "antd";

import "antd/dist/antd.css";
import "antd/lib/steps/style/css";
import "antd/lib/row/style/css";
import "antd/lib/col/style/css";
import { boolean, object, string, number, ref } from "yup";

// Instruments
import Styles from "./styles.m.css";
import { getUniqueID } from "../../../instruments";

const Step = Steps.Step;

export class Wizard extends Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      values: props.initialValues.shape || {}
    };
  }

  next = values =>
    this.setState(state => ({
      current: Math.min(state.current + 1, this.props.children.length - 1),
      values
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
    // bag.setSubmitting(false);
  };

  render() {
    const { pageCount } = this.props;
    const { current, values } = this.state;

    const { children } = this.props;

    const activePage = React.Children.toArray(children)[current];
    const isLastPage = current === React.Children.count(children) - 1;

    const steps = [];
    for (let step = 0; step < pageCount; step++) {
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
      <section className={Styles.questionnaire}>
        <div className={Styles.leftBar}>
          <Steps current={current} direction="vertical" size="big">
            {steps.map(step => (
              <Step description={step.description} key={getUniqueID()} />
            ))}
          </Steps>
        </div>
        <div className={Styles.rightBar}>
          <Formik
            enableReinitialize={false}
            initialValues={this.props.initialValues.shape[current]}
            validationSchema={object().shape(
              this.props.initialValues.schema[current]
            )}
            // validate={this.validate}
            onSubmit={this.handleSubmit}
            render={this._getFormMarkup}
          >
            {props => {
              const { isFetching } = this.props;
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
              } = props;

              const centeredWrapperStyle = cx(Styles.wrapper, {
                [Styles.disabledInput]: isFetching
              });

              const nextBtnMessage = isFetching ? "Loading..." : "Go forward";
              const prevBtnMessage = isFetching ? "Loading..." : "Go back";
              const submitBtnMessage = isFetching ? "Loading..." : "Submit";
              return (
                <form className={Styles.form} onSubmit={handleSubmit}>
                  <div className={centeredWrapperStyle}>
                    {activePage}
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
                        <Button
                          disabled={isSubmitting}
                          htmlType="submit"
                          type="primary"
                        >
                          {submitBtnMessage}
                        </Button>
                      )}
                    </div>

                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </section>
    );
  }
}
