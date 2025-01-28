const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for your React frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://sports-events-tracker.netlify.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true"); // If you're using cookies or authorization headers
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight requests
  }
  next();
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sahanabg:sahanabg%40123@eventmanagement.tm565.mongodb.net/test"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schemas

const eventSchema = mongoose.Schema({
  image: { type: String, required: true },
  event_name: { type: String, required: true },
  event_category: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
});

eventSchema.virtual("status").get(function () {
  const now = new Date();

  if (this.cancelled) {
    return "cancelled";
  } else if (now < this.start_time) {
    return "upcoming";
  } else if (now >= this.start_time && now <= this.end_time) {
    return "ongoing";
  } else {
    return "completed";
  }
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

const userSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Array to store registered events
});

// Define Models
const Event = mongoose.model("Event", eventSchema);
const User = mongoose.model("User", userSchema);

app.get("/api/events", async (req, res) => {
  let data = await Event.find({});
  return res.json(data);
});
// 1. Create User API
app.post("/api/user/create", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = new User({ userId });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res
        .status(400)
        .json({
          error: `${JSON.stringify(
            error.keyValue
          )} already exists,Please click on Login`,
        });
    }
  }
});

// 2. Login User API
app.post("/api/user/login", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user)
      return res
        .status(404)
        .json({ error: "User not found,Please create a User before Login" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Get All Events List API
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().lean({ virtuals: true });
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Get All Registered Events List API for a specific user
app.get("/api/user/events/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId }).populate("events");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Register Event API
app.post("/api/user/:userId/register", async (req, res) => {
  const { userId } = req.params;
  const { eventId } = req.body;

  try {
    const user = await User.findOne({ userId });
    const event = await Event.findById(eventId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!event) return res.status(404).json({ error: "Event not found" });
    if (!user.events.includes(eventId)) {
      user.events.push(eventId);
      await user.save();
    }

    res.json({ message: "User registered for event", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Unregister Event API
app.post("/api/user/:userId/unregister", async (req, res) => {
  const { userId } = req.params;
  const { eventId } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Remove event from the user's registered events list
    user.events = user.events.filter((event) => event.toString() !== eventId);
    await user.save();

    res.json({ message: "User unregistered from event" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/events", async (req, res) => {
  let { image, event_name, event_category, start_time, end_time } = req.body;
  let data = await Event.create({
    image: image,
    event_name: event_name,
    event_category: event_category,
    start_time: start_time,
    end_time: end_time,
  });
  console.log(data);
  return res.json("new event created");
});

// Start the server
app.listen(1000, () => {
  console.log("Server is running on port 1000");
});
