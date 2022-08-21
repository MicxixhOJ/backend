let Supervisor = require("../models/supervisor");

//SUPERVISOR REGISTER CONTROLLER
const register = async (req, res) => {
  const { fullName, supervisorID, password, email } = req.body;

  try {
    //CHECK IF THE SUPERVISOR HAS BEEN REGISTERED BEFORE
    const existingSupervisor = await Supervisor.findOne({ email });

    if (existingSupervisor)
      return res.status(400).send("Supervisor Already Exists");

    //ELSE SAVE SUPERVISOR
    const newSupervisor = new Supervisor({ fullName, password, email, supervisorID });

    await newSupervisor
      .save()
      .then(() => res.status(201).json({ supervisor: newSupervisor }))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//SUPERVISOR LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //CHECK IF THE SUPERVISOR IS IN THE DATABASE
    const existingSupervisor = await Supervisor.findOne({ email });

    if (!existingSupervisor)
      return res.status(401).json({ error: "Supervisor Does Not Exist" });

    if (existingSupervisor.password !== password)
      return res.status(401).json({ error: "Incorrect Email or Password" });

    return res.status(200).json({ supervisor: existingSupervisor });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAll =  async (req, res) => {
 await Supervisor.find({}).then((err, docs)=> {
  if (err) throw err
  res.send(docs)
 })
 .catch(err => res.send(err))
}

module.exports = {
  register,
  login,
  getAll
};
