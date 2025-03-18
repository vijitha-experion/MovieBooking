const emailWarning = "Email must be entered";
const phoneWarning = "Phone must be entered";
const phonePattern = /^[6-9]\d{9}$/;
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const incorrectPattern = "You entered incorrect phone number";
const incorrectEmail = "You entered incorrect email";

export {
  emailWarning,
  phoneWarning,
  phonePattern,
  incorrectPattern,
  emailPattern,
  incorrectEmail,
};
