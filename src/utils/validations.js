export const isEmailValid = function (email) {
  return email.includes("@");
};

export const isPasswordValid = function (value, size) {
  return value.length >= size;
};
