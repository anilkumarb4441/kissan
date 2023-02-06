import { retryable } from "async";
import Amplify, { API, graphqlOperation, Auth, Hub, Logger } from "aws-amplify";
import $ from 'jquery';
export async function register(
  name,
  phone_number,
  password,
  confpassword,
  access,
  handleRegisterResult,
  handleLoginResult
) {
  try {
    if (name == "" || phone_number.length < 5 || password == "") {
      $("#register_error").show();
      $("#register_error").text("Please fill all the fields to register.");
    } else {
      $("#register_error").hide();
      const { user } = await Auth.signUp({
        username: phone_number,
        phone_number: phone_number,
        password: password,

        attributes: {
          name: name,
          "custom:access": access,
        },
      });
      localStorage["userpass"] = password;
      handleRegisterResult(phone_number, true, user);
    }
  } catch (error) {
    if (
      error.message.includes("User exists") ||
      error.message.includes("already exists")
    ) {
      try {
        const user = await Auth.signIn(phone_number, password);

        if (user.signInUserSession != null) {
          handleLoginResult(phone_number, true, user);
        } else {
          Auth.resendSignUp(phone_number);
        }
      } catch (e) {
        Auth.resendSignUp(phone_number);
      }
      localStorage["userpass"] = password;
      handleRegisterResult(phone_number, true, "");
    } else {
      localStorage["userpass"] = "";
      handleRegisterResult(phone_number, false, error);
    }
  }
}

export async function ResendSignUp(phone_number, handleRegisterResult) {
  Auth.resendSignUp(phone_number);
  handleRegisterResult(phone_number, true, "");
}

export async function signUp(username, password, email, name, access, handleLoginResult) {
  try {
    const { user } = await Auth.signUp({
      username: username,
      password: password,

      attributes: {
        email: email, // optional
        name: name,
        "custom:access": access,
        // optional - E.164 number convention
        // other custom attributes
      },
    });
    console.log(user);
  } catch (error) {
    if (
      error.message.includes("User exists") ||
      error.message.includes("already exists")
    ) {
      try {
        const user = await Auth.signIn(username, password);

        if (user.isSignedIn) {
          handleLoginResult(username, true, user);
        } else {
          Amplify.Auth.resendSignUpCode(username);
        }
      } catch (e) {
        Amplify.Auth.resendSignUpCode(username);
      }
    }
    console.log("error signing up:", error);
  }
}

export async function confirmSignUp(username, code, callback) {
  try {
    await Auth.confirmSignUp(username, code)
      .then((data) => callback(true, username))
      .catch((err) => callback(false, err));
  } catch (error) {
    callback(false, error);
  }
}

export async function resendConfirmationCode(username, callback) {
  try {
    if (username.length < 5) {
      $("#confrmaccount_error").show();
      $("#confrmaccount_error").text("Please provide valid phone number");
    } else {
      $("#confrmaccount_error").hide();
      await Auth.resendSignUp(username)
        .then((data) => (callback != null ? callback(true, username) : null))
        .catch((err) => (callback != null ? callback(false, err) : null));
    }
  } catch (error) {
    callback(false, error);
  }
}

export async function signIn(username, password, handleLoginResult, event) {
  $(event.target).attr("disabled", true);
  try {
    if (password == "" || username.length < 5 || username == "") {
      $("#login_error").show();
      $("#login_error").text("Please fill all the fields to register.");
      $(event.target).attr("disabled", false);
    } else {
      const user = await Auth.signIn(username, password);
      handleLoginResult(username, true, user);
    }
  } catch (error) {
    console.log("error signing in", error);
    handleLoginResult(username, false, error);
    $(event.target).attr("disabled", false);
  }
}

export async function resendOTPForAuth(phone_number) {
  try {
    await Auth.resendSignUp(phone_number);
    $("#resentotpmsg").show();
    $("#resentotpmsg").text("Code resent successfully");
  } catch (err) {
    $("#resentotpmsg").show();
    $("#resentotpmsg").text("Error resending code: " + err);
  }
}

export async function verifyCurrentUserAttribute(phone_number) {
  try {
    await Auth.verifyCurrentUserAttribute("phone_number");
    console.log("a verification code is sent");
  } catch (err) {
    console.log("failed with error: ", err);
  }
}

export async function verifyCurrentUserAttributeSubmit(
  phone_number,
  code,
  callback
) {
  try {
    await Auth.verifyCurrentUserAttributeSubmit("phone_number", code);
    callback(true, phone_number);
  } catch (error) {
    console.log("failed with error: ", error);
    callback(false, phone_number, error);
  }
}

export function getCurrentSession(callback) {
  try {
    Auth.currentSession()
      .then((data) => {
        let idToken = data.getIdToken();
        var payload = idToken.payload;
        let user = {
          name: payload["name"],
          phone_number: payload["phone_number"],
          "custom:access": payload["custom:access"],
        };
        callback(true, user, idToken["jwtToken"]);
      })
      .catch((err) => {
        callback(false, err);
      });
  } catch (err) {
    callback(false, err);
  }
}

export async function signOut(handleLogoutResult) {
  try {
    await Auth.signOut();
    handleLogoutResult();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export async function changePassword_initiate(username, callback) {
  try {
    if (username.length < 5) {
      $("#chpassword_1_error").show();
      $("#chpassword_1_error").text("Please provide valid phone number");
    } else {
      $("#chpassword_1_error").hide();
      Auth.forgotPassword(username)
        .then((data) => (callback != null ? callback(true, username) : null))
        .catch((err) => (callback != null ? callback(false, err) : null));
    }
    // Send confirmation code to user's email
  } catch (error) {
    callback(false, error);
  }
}

export async function changePassword_finalize(
  username,
  code,
  new_password,
  callback
) {
  try {
    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(username, code, new_password)
      .then((data) => callback(true))
      .catch((err) => callback(false, err));
  } catch (error) {
    callback(false);
  }
}

export async function changePasswordWithOldPsd(
  old_password,
  new_password,
  callback
) {
  try {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, old_password, new_password);
      })
      .then((data) => callback(true))
      .catch((err) => callback(false, err));
  } catch (error) {
    callback(false);
  }
}

window.register = register;
window.signIn = signIn;
window.confirmSignUp = confirmSignUp;
window.resendConfirmationCode = resendConfirmationCode;
window.verifyCurrentUserAttributeSubmit = verifyCurrentUserAttributeSubmit;
window.signUp = signUp;
window.resendOTPForAuth = resendOTPForAuth;
window.changePasswordWithOldPsd = changePasswordWithOldPsd;
window.getCurrentSession = getCurrentSession;
window.signOut = signOut;
window.changePassword_initiate = changePassword_initiate;
window.changePassword_finalize = changePassword_finalize;
window.ResendSignUp = ResendSignUp;
