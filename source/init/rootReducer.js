// Core
import { combineReducers } from "redux";

// Reducers
import { uiReducer as ui } from "../bus/ui/reducer";
import { formsReducer as forms } from "../bus/forms/reducer";
import { authReducer as auth } from "../bus/auth/reducer";
import { profileReducer as profile } from "../bus/profile/reducer";
import { questionnaireReducer as questionnaire } from "../bus/questionnaire/reducer";

export const rootReducer = combineReducers({
  ui,
  forms,
  auth,
  questionnaire,
  profile
});
