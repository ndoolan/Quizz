const path = require("path");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();

const port = process.env.port || 3000;
const prod = process.env.NODE_ENV === "production";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
//   await prisma.user.create({
//     data: {
//       username: "alice",
//       password: "1234",
//       firstName: "Alice",
//       lastName: "Wonderland",
//       lastAnswered: new Date(),
//       email: "Alice@Wonderland.io",
//     },
//   });

  const allUsers = await prisma.user.findMany(); 
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    //   process.exit(1);
  });
  
// const connectionConfig = {
//   host: "34.31.175.22",
//   port: 5432, // Default port for PostgreSQL
//   user: "nebula-1991",
//   password: "tooeasy",
//   database: "postgres",
// };

// const { Pool } = require("pg");

// (async function connectToDatabase() {
//   try {
//     const pool = new Pool(connectionConfig);
//     const client = await pool.connect();
//     console.log("Connected to Cloud SQL");
//     return client;
//   } catch (error) {
//     console.error("Error connecting to Cloud SQL:", error);
//     throw error; // Re-throw to handle error in calling code
//   }
// })();

app.use(express.static(path.join(__dirname, prod ? "./" : "../../", "dist")));
app.use(express.static(path.join(__dirname, "../assets")));

app.get("/", (_req: Request, _res: Response) => {
  //   return res.sendFile(
  //     path.join(__dirname, prod ? "" : "../../", "dist/index.html")
  //   );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} 🚀`);
});
