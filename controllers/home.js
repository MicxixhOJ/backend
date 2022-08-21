
//define controller
let homeController = (req, res) => {
    //send string as response
  res.send("Home");
};

//profile controller
let profileController = (req, res) => {
  res.send('Profile')
}



module.exports = {
  homeController,
  profileController
};
