export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await User.findOne({
      email,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: student._id,
        role: student.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      message: "Login successful",
      user: {
        _id: student._id,
        name: student.name,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBusesForStudent = async (req, res) => {
  try {
    const buses = await Bus.find({
      collegeId: req.user.collegeId,
    });

    res.json({ buses });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};