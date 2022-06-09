export const notNull = (value: string | number): boolean => {
  let result = false;
  switch (typeof value) {
    case "string":
      if (value !== null && value.trim() !== "") result = true;
      break;
    case "number":
      if (value !== null && value > 0) result = true;
      break;
  }
  return result;
};

export const isEmail = (value: string): boolean => {
  const emailExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return emailExp.test(value);
};

export const isPassword = (value: string): boolean => {
  const pwdExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return pwdExp.test(value);
};
