// register-and-auth.js - One-time setup script
// Run this to register and authenticate with the evaluation service

const axios = require("axios");

const USER_DATA = {
  email: "adishri.sahu_cs.da23@gla.ac.in",
  name: "Adishri Sahu",
  mobileNo: "8115970630",
  githubUsername: "Adishrisahu26",
  rollNo: "2315200004",
  accessCode: "RPsgYt"
};

const REGISTRATION_URL = "http://4.224.186.213/evaluation-service/register";
const AUTH_URL = "http://localhost:3001/auth";

async function register() {
  try {
    console.log("\n📝 Registering with Evaluation Service...\n");
    
    const response = await axios.post(REGISTRATION_URL, USER_DATA);
    
    const { clientID, clientSecret } = response.data;
    
    console.log("✅ Registration Successful!\n");
    console.log("Your Credentials:");
    console.log("================");
    console.log(`Email:        ${response.data.email}`);
    console.log(`Name:         ${response.data.name}`);
    console.log(`Roll No:      ${response.data.rollNo}`);
    console.log(`Client ID:    ${clientID}`);
    console.log(`Client Secret: ${clientSecret}`);
    console.log("\n⚠️  SAVE THESE CREDENTIALS - YOU CANNOT RETRIEVE THEM AGAIN!\n");
    
    return { clientID, clientSecret };
  } catch (error) {
    if (error.response?.data?.message === "email already exists") {
      console.log("⚠️  Email already registered!");
      console.log("\nIf you have your credentials, use them to authenticate.");
      console.log("If you lost them, contact support.\n");
      return null;
    }
    
    console.error("❌ Registration Failed:", error.response?.data || error.message);
    return null;
  }
}

async function authenticate(clientID, clientSecret) {
  try {
    console.log("\n🔐 Authenticating with Backend...\n");
    
    const response = await axios.post(AUTH_URL, {
      clientID,
      clientSecret,
      rollNo: USER_DATA.rollNo,
      accessCode: USER_DATA.accessCode
    });
    
    const { token } = response.data;
    
    console.log("✅ Authentication Successful!\n");
    console.log("Token:");
    console.log("======");
    console.log(token);
    console.log("\n✅ Logging is now active on your notification system!");
    console.log("All operations will be logged to the evaluation service.\n");
    
    return token;
  } catch (error) {
    console.error("❌ Authentication Failed:", error.response?.data || error.message);
    console.error("\nMake sure:");
    console.error("  1. Your backend is running (npm start or node server.js)");
    console.error("  2. clientID and clientSecret are correct");
    console.error("  3. Backend is on port 3001\n");
    return null;
  }
}

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════════╗");
  console.log("║         Registration & Authentication Setup                     ║");
  console.log("║                                                                ║");
  console.log("║  This script will:                                             ║");
  console.log("║  1. Register you with the Evaluation Service                   ║");
  console.log("║  2. Get your clientID and clientSecret                         ║");
  console.log("║  3. Authenticate your backend                                  ║");
  console.log("║  4. Enable logging to the evaluation service                   ║");
  console.log("╚════════════════════════════════════════════════════════════════╝\n");
  
  // Step 1: Register
  const credentials = await register();
  
  if (!credentials) {
    console.log("\n🔄 Manual Setup Required");
    console.log("========================");
    console.log("\nSince registration failed, do this manually:");
    console.log("\n1. Open Thunder Client or Postman");
    console.log("2. Create POST request to: http://4.224.186.213/evaluation-service/register");
    console.log("3. Use this body:");
    console.log(JSON.stringify(USER_DATA, null, 2));
    console.log("\n4. Save the clientID and clientSecret from the response");
    console.log("5. Then run this command to authenticate:");
    console.log("\n   node register-and-auth.js --auth CLIENT_ID CLIENT_SECRET\n");
    return;
  }
  
  // Step 2: Authenticate
  const token = await authenticate(credentials.clientID, credentials.clientSecret);
  
  if (token) {
    console.log("📊 Your Notification System is Ready!");
    console.log("=====================================");
    console.log("\nYou can now:");
    console.log("  ✓ Create notifications");
    console.log("  ✓ All operations are logged");
    console.log("  ✓ View logs in evaluation service");
    console.log("\nNext steps:");
    console.log("  1. Open frontend: notification_app_fe/index.html");
    console.log("  2. Start using your notification system");
    console.log("  3. Check logs at: http://4.224.186.213/evaluation-service/logs\n");
  }
}

// Handle command-line arguments for manual auth
if (process.argv[2] === "--auth" && process.argv[3] && process.argv[4]) {
  authenticate(process.argv[3], process.argv[4]);
} else {
  main().catch(console.error);
}
