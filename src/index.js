import express from "express";
import session from "express-session";

const app = express();

// setup session middleware
app.use(
  session({
    secret: "Kucing-pindang177013",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

// set session data
app.get("/set-session", (req, res) => {
  req.session.name = "bapak hitam";
  req.session.age = 22;
  res.send("session data has been set");
});

// get session data
app.get("/get-session", (req, res) => {
  const { name, age } = req.session;
  res.send(`user name: ${name}, age: ${age}`);
});

// delete session data
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("gagal menghapus session!");
    }
    res.send("session telah dihapus");
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
