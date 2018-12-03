// Instruments
import { MAIN_URL } from "../config";
import { fromJS, List } from "immutable";

export class Questionnaire {
  async fetchQuestionnaire() {
    const response = await fetch(`${MAIN_URL}/questionnaire/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });
    const questionnaire = await response.json();

    // if (response.status !== 200) {
    //     const message = '';
    //     throw new Error(message);
    // }

    return questionnaire;
  }
}
