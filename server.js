const express = require("express");

const app = express();
app.use(express.json());

// Health check — handy for confirming the deploy is up.
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/", (_req, res) => {
  res.json({
    message: "It's live. This Express API is running on Dockhold.",
    docs: "https://dockhold.eu/docs/recipes/deploy-a-node-express-api",
  });
});

// Listen on the port Dockhold assigns, on all interfaces. Binding localhost or
// a fixed port means no traffic reaches you.
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`listening on ${port}`);
});
