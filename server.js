require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`💖 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌟 Environment: ${process.env.NODE_ENV || "development"}`);
});
