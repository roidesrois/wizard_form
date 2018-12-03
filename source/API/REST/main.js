// Instruments
import { Auth } from "./auth";
import { Questionnaire } from "./questionnaire";
import { Profile } from "./profile";

export default new class API {
  get token() {
    return localStorage.getItem("token");
  }

  auth = new Auth();
  questionnaire = new Questionnaire();
  profile = new Profile();
}();
