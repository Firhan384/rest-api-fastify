import bcrypt from "bcrypt";

const saltRounds = 12;

export const hashText = (text: string): string => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(text, salt);

  return hash;
};

export const compareHashText = (text: string, textHash: string): boolean => {
  return bcrypt.compareSync(text, textHash);
};
