const jwt = require("jsonwebtoken");
const connectToDB = require("../models/db");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDB();

    db.query("CALL Login(?, ?)", [email, password], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }
      const user = results[0][0];

      if (user) {

        const name = user.name;
        const groupID = user.group_id;
        
        const token = jwt.sign(
          { id: user.id, username: user.name, groupID: user.group_id},
          process.env.JWT_SECRET,
          { expiresIn: "6h" }
        );

        return res.json({ token, name, groupID });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Connection error", error: error.message });
  }
};
