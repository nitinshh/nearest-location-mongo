const userModel = require("../Models/userModel");

module.exports = {
  Add: async (req, res) => {
    console.log('==== Request Body:', req.body);
    let data = req.body;
    try {
      let userdata = new userModel({
        name: data.name,
        email: data.email,
        address: data.address,
        location: {
          type: "Point",
          coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
        },
      });

      await userdata.save();

      res.status(201).json({
        status: true,
        message: "user added successfully",
        data: userdata, // Sending back the created user details
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "An error occurred while adding an user",
        error: error.message, // Providing more details on the error
      });
    }
  },

  get: async (req, res) => {
    try {
      const maxDistance = req.body.maxDistance
      const latitude = parseFloat(req.body.latitude); // mycurrent lat
      const longitude = parseFloat(req.body.longitude);  // mycurrent long

      const store_data = await userModel.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [longitude, latitude] },
            key: "location",
            maxDistance: maxDistance ? maxDistance*1000 :20000 ,// in meters
            distanceField: "dist.calculated",
            spherical: true,
          },
        },
      ]);

      res.status(200).json({
        status: true,
        message: "Nearby user fetched successfully",
        data: store_data,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "An error occurred while fetching nearby user",
        error: error.message, // Providing more details on the error
      });
    }
  },
};
