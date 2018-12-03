// Instruments
import { AUTH_URL } from "../config";

export class Auth {
  async signup(userInfo) {
    const response = await fetch(`${AUTH_URL}/public/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    });

    const { response: userProfile, message } = await response.json();

    if (response.status !== 200) {
      throw new Error(message);
    }

    return userProfile;
  }

  async confirmSignup(registrationHash) {
    const response = await fetch(
      `${AUTH_URL}/public/registration/confirm?registrationHash=${registrationHash}`,
      {
        method: "GET"
      }
    );

    return response;
  }

  async activateAccount(userInfo) {
    const registrationHash = localStorage.getItem("confirmationHash");
    const emailChange = localStorage.getItem("emailChange");

    const response = await fetch(
      `${AUTH_URL}/public/passwordVerification?confirmationHash=${registrationHash}&emailChange=${emailChange}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
      }
    );

    return response;
  }

  async login(credentials) {
    const response = await fetch(
      `${AUTH_URL}/oauth/token?username=${encodeURIComponent(
        credentials.email
      )}&password=${encodeURIComponent(
        credentials.password
      )}&grant_type=password`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa("yukselishclient:XY7kmzoNzl100")}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const oauthData = await response.json();

    if (response.status !== 200) {
      const message = "Your login or password is incorrect";
      throw new Error(message);
    }

    return oauthData;
  }

  async authenticate() {
    const response = await fetch(`${AUTH_URL}/user/credentials`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
      // body: JSON.stringify({ token: this.token }),
    });

    const userProfile = await response.json();

    if (response.status !== 200) {
      const message = "Server error";
      throw new Error(message);
    }

    return userProfile;
  }

  async logout() {
    const response = await fetch(`${AUTH_URL}/user/logout`, {
      method: "GET",
      headers: {
        Authorization: this.token
      }
    });

    if (response.status !== 204) {
      const { message } = await response.json();

      throw new Error(message);
    }
  }
}
