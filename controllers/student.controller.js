const Student = require("../models/student");

// STUDENT REGISTER CONTROLLER
const register = async (req, res) => {
  const {
    fullName,
    username,
    password,
    email,
    matricNumber,
    supervisor,
    industrySupe,
    supervisorName,
    industrySupervisorName,
  } = req.body;

  try {
    //CHECK IF THE STUDENT HAS REGISTERED BEFORE
    const existingUser = await Student.findOne({ email });
    //IF STUDENT HAS REGISTERED BEFORE STOP THE PROCESS
    if (existingUser) {
      return res.status(400).send("Student Already Exists");
    }

    //ELSE TRY TO SAVE THE STUDENT WITH THE PARAMETERS COLLECTED FROM THE FORM
    const newStudent = new Student({
      fullName,
      password,
      email,
      username,
      matricNumber,
      supervisor,
      industrySupervisor: industrySupe,
      supervisorName,
      industrySupervisorName,
    });

    await newStudent
      .save()
      .then(() => {
        res.status(201).json({ student: newStudent });
      })
      .catch((err) => {
        console.log(err);
        return res.status(406).send("Something went wrong");
      });
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

    if (!existingUser) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ error: "Incorrect Email or Password" });
    }

    return res.status(200).json({ student: existingUser });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAll = async (req, res) => {
  await Student.find({})
    .then((err, docs) => {
      if (err) {
        throw err;
      }
      res.send(docs);
    })
    .catch((err) => res.send(err));
};

const totalDocs = async (req, res) => {
  try {
    const totalStudents = await Student.estimatedDocumentCount();

    return res.status(200).send({ data: totalStudents });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

const updateUser = async (req, res) => {
  const { id, industry, industrySupervisor, supervisor, year, phone } =
    req.body;

  try {
    await Student.findByIdAndUpdate(id, {
      supervisorName: supervisor,
      phoneNumber: phone,
      industrySupervisorName: industrySupervisor,
      industry: industry,
      year: year,
    })
      .then((response) => {
        return res.status(200).json({ student: response });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const getOneStudent = async (req, res) => {
  let { id } = req.body;

  try {
    await Student.findById(id)
      .then((data) => {


        if (data) {

          delete data.password
          
          res.send({
            code: "200",
            status: "success",
            message: "Student retrieved successfully",
            data: data,
          });
        } else {
          res.status(404).send({ message: `Student with id ${id} Not found ` });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          code: "500",
          status: "error",
          message: `Error retrieving Student with id=${id}`,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  getAll,
  totalDocs,
  updateUser,
  getOneStudent,
};
