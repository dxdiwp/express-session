import express from "express";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup session middleware
app.use(
  session({
    secret: "Kucing-pindang177013",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  })
);

// middleware check auth
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Anda belum login",
    });
  }
  next();
};

// login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    // simpan user ke sesi
    req.session.user = {
      username: username,
      timestamp: new Date(),
    };
    res.status(200).json({
      message: "login sukses",
      user: req.session.user,
    });
  } else {
    res.status(401).json({
      message: "username atau password salah",
    });
  }
});

// protected route
app.get("/protected", checkAuth, (req, res) => {
  res.status(200).json({
    message: "protected data",
    user: req.session.user,
  });
});

// delete session data
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "usaha logout gagal",
      });
    }
    res.send("logout berhasil");
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
