import User from "../userModel/userModel.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { yourname, youremail, password } = req.body;

  if (!yourname || !youremail || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const userExist = await User.findOne({ youremail });
    if (userExist) {
      return res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      yourname,
      youremail,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: "success",
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: "failure", error: "Internal Server Error" });
  }
};

const Login = async (req, res) => {
  const { youremail, password } = req.body;

  if (!youremail || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const userExist = await User.findOne({ youremail });

    if (!userExist) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      success: "success",
      message: "User logged in successfully",
      user: userExist,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: "success", error: "Internal Server Error" });
  }
};

export { registerUser, Login };
