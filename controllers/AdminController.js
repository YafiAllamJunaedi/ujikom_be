import Admin from "../models/AdminModel.js";

export const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (admin !== null) {
      const match = req.body.password === admin.password;

      if (!match) {
        return res.status(400).json("Password salah");
      } else {
        res.json({
          message: "Login berhasil",
          admin: {
            id: admin.id,
            email: admin.email,
            name: admin.name,
          },
        });
      }
    } else {
      res.status(400).json("Email belum terdaftar sebagai admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
