// Core
import { boolean, object, string, number, ref } from "yup";

export const getWizardFormValidation = questionnaire => {
  let shapeArray = [];
  let schemaArray = [];
  let obj = {
    shape: {},
    schema: {}
  };

  const pages = questionnaire.pageAnswers;
  {
    pages.map(page => {
      // const shape = {};
      let schema = {};
      const schemaData = {};

      page.questionModelAnswers.map(group => {
        group.questionAnswers.map(questionAnswer => {
          obj.shape["question" + questionAnswer.question.id] = "";
          schemaData["question" + questionAnswer.question.id] = string()
            .required()
            .matches(
              new RegExp(questionAnswer.question.regex ? questionAnswer.question.regex.name : "")
            );
        });

        schema = schemaData;

        // shapeArray.push(shape);
        schemaArray.push(schema);
      });
    });
  }

  // obj.shape = shapeArray;
  obj.schema = schemaArray;
  return obj;
};

export const login = {
  shape: {
    email: "",
    password: ""
    // remember: true,
  },
  schema: object().shape({
    email: string()
      .email()
      .required(),
    password: string()
      .min(5)
      .required(),
    // remember:       boolean(),
    forgotPassword: boolean()
  })
};
export const forgetPassword = {
  shape: {
    email: ""
  },
  schema: object().shape({
    email: string()
      .email()
      .required()
  })
};
export const signup = {
  shape: {
    firstName: "",
    lastName: "",
    serialNumber: "",
    pinCode: "",
    email: "",
    emailConfirm: ""
  },
  schema: object().shape({
    firstName: string(),
    lastName: string(),
    serialNumber: string()
      .required()
      // .integer()
      // .positive()
      // .min(10000000)
      // .max(99999999),
      .matches(new RegExp(/^\d{8}$/)),
    pinCode: string()
      .required()
      .matches(new RegExp(/^[0-9a-zA-Z]{7}$/)),
    email: string()
      .required()
      .email(),
    emailConfirm: string()
      .email()
      .required()
      .oneOf([ref("email"), null])
  })
};
export const passwordVerification = {
  shape: {
    password: "",
    passwordConfirm: "",
    confirmationHash: "",
    emailChange: ""
  },
  schema: object().shape({
    password: string()
      .required()
      .min(5),
    passwordConfirm: string()
      .required()
      .min(5)
      .oneOf([ref("password"), null])
  })
};
export const newPassword = {
  shape: {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: ""
  },
  schema: object().shape({
    oldPassword: string()
      .required()
      .min(5),
    newPassword: string()
      .required()
      .min(5),
    newPasswordConfirm: string()
      .required()
      .min(5)
      .oneOf([ref("newPassword"), null])
  })
};
export const updateEmail = {
  shape: {
    email: "",
    emailConfirm: ""
  },
  schema: object().shape({
    email: string()
      .required()
      .email(),
    emailConfirm: string()
      .required()
      .email()
  })
};
export const composer = {
  shape: {
    comment: ""
  },
  schema: object().shape({
    comment: string()
      .required()
      .min(1)
  })
};
