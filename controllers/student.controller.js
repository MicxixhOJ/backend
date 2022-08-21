const Student = require("../models/student");

// STUDENT REGISTER CONTROLLER
const register = async (req, res) => {
  const { fullName, username, password, email, matricNumber, supervisor } = req.body;

  try {
    //CHECK IF THE STUDENT HAS REGISTERED BEFORE
    const existingUser = await Student.findOne({ email });
    //IF STUDENT HAS REGISTERED BEFORE STOP THE PROCESS
    if (existingUser) return res.status(400).send("Student Already Exists");

    //ELSE TRY TO SAVE THE STUDENT WITH THE PARAMETERS COLLECTED FROM THE FORM
    const newStudent = new Student({
      fullName,
      password,
      email, 
      username,
      matricNumber,
      supervisor,
    });

    await newStudent
      .save()
      .then(() => {
        res.status(201).json({ student: newStudent });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// STUDENT LOGIN CONTROLLER
const login = async (req, res) => {
  const { matricNumber, password } = req.body;

  try {
    const existingUser = await Student.findOne({ matricNumber });

    //CHECK IF SAID STUDENT IS IN THE DATABASE

    if (!existingUser)
      return res.status(401).json({ error: "User Does Not Exist" });

    if (existingUser.password !== password)
      return res.status(401).json({ error: "Incorrect Email or Password" });

    return res.status(200).json({ student: existingUser });
  } catch (error) {
    return res.status(500).json(error); 
  }
};

module.exports = {
  register,
  login,
};
