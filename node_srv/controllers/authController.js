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
        console.log('Login worked');

        //94 is admin groupID
        const role = user.group_id === 94 ? 'admin' : 'user';

        const token = jwt.sign(
          { id: user.id, username: user.username, role: role }, 
          process.env.JWT_SECRET,
          { expiresIn: "6h" }
        );

        return res.json({ token });
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
