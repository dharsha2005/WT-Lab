const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "..")));

mongoose.connect("mongodb://127.0.0.1:27017/contactsDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err: any) => console.error("❌ MongoDB connection error:", err));

// Define the Contact schema and model
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  msg: { type: String, required: true },
});

const Contact = mongoose.model("Contact", ContactSchema);

// Create Contact
app.post("/contacts", async (req: any, res: any) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
});

// Get All Contacts
app.get("/contacts", async (_req: any, res: any) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Update Contact
app.put("/contacts/:id", async (req: any, res: any) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

// Delete Contact
app.delete("/contacts/:id", async (req: any, res: any) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});
// Define the Poultry schema and model
const PoultrySchema = new mongoose.Schema({
  numChickens: { type: Number, required: true },
  eggsPerChicken: { type: Number, required: true },
  days: { type: Number, required: true },
  totalEggs: { type: Number, required: true },
});

const Poultry = mongoose.model("Poultry", PoultrySchema);

// Save Poultry Data
app.post("/poultry", async (req: any, res: any) => {
  try {
    const poultryData = new Poultry(req.body);
    await poultryData.save();
    console.log("Poultry data saved:", poultryData); // Log the saved data
    res.status(201).json(poultryData);
  } catch (error) {
    res.status(500).json({ error: "Failed to save poultry data" });
  }
});
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});