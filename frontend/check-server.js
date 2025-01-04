const http = require("http");

const options = {
  hostname: "localhost",
  port: 5050,
  path: "/api/auth",
  method: "GET",
  timeout: 2000 // Timeout after 2 seconds
};

const req = http.request(options, (res) => {
  console.log("\x1b[32m%s\x1b[0m", "Server check response:", res.statusCode);
  if (res.statusCode === 200) {
    console.log("Server is up and running on port 5050.");
    process.exit(0); // Exit with code 0 (success)
  } else {
    console.error("Server is not responding correctly.");
    process.exit(1); // Exit with code 1 (failure)
  }
});

req.on("error", (err) => {
  console.error("\x1b[31m%s\x1b[0m", "Backend server is not running:", err.message);
  console.error("\x1b[31m%s\x1b[0m", "Please start the backend server first.");
  process.exit(1); // Exit with code 1 (failure)
});

req.on("timeout", () => {
  console.error("Server check timed out.");
  process.exit(1); // Exit with code 1 (failure)
});

req.end();
