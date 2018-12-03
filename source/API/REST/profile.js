// Instruments
import { AUTH_URL } from "../config";

export class Profile {
  async resetPassword(email) {
    const response = await fetch(
      `${AUTH_URL}/public/resetPassword?email=${email}`,
      {
        method: "POST"
      }
    );

    return response;
  }

  async updatePassword(passwordData) {
    console.log(passwordData);

    const response = await fetch(`${AUTH_URL}/user/changePassword`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(passwordData)
    });

    return response;
  }

  async updateEmail(emailData) {
    console.log(emailData);

    const response = await fetch(`${AUTH_URL}/user/changeEmail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    const oauthData = await response.json();

    if (response.status !== 200) {
      throw new Error(message);
    }

    return oauthData;
  }

  async updateProfile(profileInfo) {
    const response = await fetch(`${AUTH_URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profileInfo)
    });

    const { data: updatedProfile, message } = await response.json();

    if (response.status !== 200) {
      throw new Error(message);
    }

    return updatedProfile;
  }

  async updateAvatar(avatarFormData) {
    const response = await fetch(`${AUTH_URL}/image`, {
      method: "POST",
      headers: {
        Authorization: this.token
      },
      body: avatarFormData
    });

    const {
      data: { avatar: newAvatarUrl },
      message
    } = await response.json();

    if (response.status !== 200) {
      throw new Error(message);
    }

    return newAvatarUrl;
  }
}
