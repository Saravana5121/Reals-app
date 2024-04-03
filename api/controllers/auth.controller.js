import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashesPassword = await bcrypt.hash(password, 10);

  console.log(hashesPassword);
  //Create New User:
  const newUser = 
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
