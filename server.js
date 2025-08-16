import express from "express";

const app = express();

// Parse JSON (application/json)
app.use(express.json());

// Parse plain text (text/plain)
app.use(express.text({ type: "text/*" }));

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.post("/zoho-webhook", (req, res) => {
  console.log("✅ Headers:", req.headers);

  // If JSON
  if (req.is("application/json")) {
    console.log("📦 JSON Payload:", JSON.stringify(req.body, null, 2));
  }
  // If plain text
  else if (req.is("text/*")) {
    console.log("📜 Text Payload:", req.body);
  }
  // If form data
  else if (req.is("application/x-www-form-urlencoded")) {
    console.log("📝 Form Data Payload:", req.body);
  }
  // Fallback
  else {
    console.log("⚠️ Unknown Payload:", req.body);
  }

  res.status(200).send("Webhook received");
});

// Health check
app.get("/", (req, res) => {
  res.send("Zoho Webhook Listener is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
