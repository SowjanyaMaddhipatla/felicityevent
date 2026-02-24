import User from "../models/User.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      firstName: "System",
      lastName: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully");
  } catch (error) {
    console.error("Error creating admin:", error.message);
  }
};

export default createAdmin;
