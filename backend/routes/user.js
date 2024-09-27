const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../imageUpload");
const upload2 = require("../codingImageUpload");
const axios = require("axios");
// const Admin = require("../models/Admin.js");

// const hashMiddleware = require("../middleware/createVerifyHash");
// const sgMail = require("@sendgrid/mail");

router.get("/api/getUser", (req, res) => {
  User.find({})
    .select("-password")
    .then((users) => {
      const user = users[0];
      res.json(user);
    })

    .catch((err) => console.log(err));
});

router.get("/api/getPapers/:id", (req, res) => {
  const userId = req.params.id;
  User.find({ _id: userId })
    .then((user) => {
      const pubs = user[0].publications;
      res.json(pubs);
    })
    .catch((err) => console.log(err));
});

router.post("/api/login", function (req, res) {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields must be completed" });
  } else {
    email = email.toLowerCase();
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "Check you entered correct email" });
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid password" });
        } else {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 7200,
          });
          return res.json({ token, userId: user._id });
        }
      });
    }
  });
  // .catch((err) => console.log(err))
});

router.post("/api/tokenIsValid", function (req, res) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    } else {
      return res.json(true);
    }
  } catch (err) {
    return res.json(false);
  }
});

router.patch("/api/addPublications", (req, res) => {
  console.log("added");
  const { pub, id } = req.body;
  User.updateOne({ _id: id }, { $push: { publications: pub } })
    .then(res.json("Publication added"))
    .catch((err) => console.log(err));
});

router.patch("/api/addDashboardLink", (req, res) => {
  const { link, id } = req.body;
  console.log("link" + JSON.stringify(req.body));
  User.updateOne({ _id: id }, { $push: { dashboardLinks: link } })
    .then(res.json("Link added"))
    .catch((err) => console.log(err));
});

router.patch("/api/uploadBooksList", (req, res) => {
  const { books, id } = req.body;
  User.updateOne({ _id: id }, { $set: { booksReadList: books } })
    .then(res.json("Publication added"))
    .catch((err) => console.log(err));
});

router.patch("/api/addDiscovery", (req, res) => {
  const { discovery, id } = req.body;
  User.updateOne({ _id: id }, { $push: { discoveries: discovery } })
    .then(res.json("Discovery added added"))
    .catch((err) => console.log(err));
});

router.patch("/api/addCurrentBook", async (req, res) => {
  console.log("dfhkjfd");
  const { userId, book } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: { currentBooks: book },
    },
    { new: true }
  );
  res.status(200).send(updatedUser.currentBooks);
});

router.patch("/api/addCurrentBook", async (req, res) => {
  const { userId, book } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: { currentBooks: book },
    },
    { new: true }
  );
  res.status(200).send(updatedUser.currentBooks);
});

router.patch("/api/addWebsite", async (req, res) => {
  const { userId, website } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: { coding: website },
    },
    { new: true }
  );
  res.status(200).send(updatedUser.coding);
});

router.patch("/api/transferCurrentBook", async (req, res) => {
  const { userId, book } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { currentBooks: { Title: book.Title } },
      $push: { booksThisYear: book },
      $push: { booksReadList: book },
    },
    { new: true }
  );
  res.status(200).send(updatedUser);
});

router.post("/api/registerUser", function (req, res) {
  let { firstName, lastName, email, password } = req.body;
  const secret = process.env.JWT_SECRET;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields must be completed" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        password = hash;
        User.create({
          firstName,
          lastName,
          email,
          password,
          publications: [],
          booksReadList: [],
          currentBooks: [],
          booksThisYear: [],
          coding: [],
        })
          .then((result) => res.status(200).json({ firstName }))
          .catch((err) => console.log(err));
      }
    });
  });
});

router.get("/getLoggedInStaffMember/:id", (req, res) => {
  const _id = req.params.id;
  Staff.findOne({ _id }, (error, staffMember) => {
    if (error) {
      console.log("Error" + error);
    } else {
      res.json({ staffMember });
    }
  });
});

router.post(
  "/api/discoveryPhotoUpload",
  upload.single("file"),
  function (req, res) {
    console.log("uploaded file");
    const photo = req.file;
    console.log("photooo" + req.file);
    const photoPath = req.file.location;
    if (!photo) {
      res.json("Error - no photo uploaded");
    } else {
      res.json(photoPath);
    }
  }
);

router.post(
  "/api/codingPhotoUpload",
  upload2.single("file"),
  function (req, res) {
    console.log("uploaded file");
    const photo = req.file;
    console.log("photooo" + req.file);
    const photoPath = req.file.location;
    if (!photo) {
      res.json("Error - no photo uploaded");
    } else {
      res.json(photoPath);
    }
  }
);

router.post("/api/scholar", async (req, res) => {
  // const scholarId = req.query.author_id;
  // const apiKey = 'your_serpapi_key_here'; // Add your SerpAPI key here
  const { scholarId, apiKey } = req.body;
  console.log("ssdss" + scholarId + apiKey);
  console.log("body" + JSON.stringify(req.body));
  try {
    const response = await axios.get(
      `https://serpapi.com/search.json?api_key=${apiKey}&author_id=${scholarId}&engine=google_scholar_author`
    );
    console.log("response " + response.data);
    res.json(response.data); // Send data back to the React app
  } catch (error) {
    console.log("error " + JSON.stringify(error));
    res.status(500).send("Error occurred while fetching data from SerpAPI");
  }
});

// router.post("/createUser", hashMiddleware, (req, res) => {
//   let {
//     firstName,
//     lastName,
//     email,
//   } = req.body.staffMember;
//   email = email.toLowerCase();
//   const hash = req.hash;
//   const url = `https://onjcripip.herokuapp.com/register?${hash}`;
//   // const url = `http://localhost:3000/register?${hash}`;
//   Staff.create(
//     {
//       firstName,
//       lastName,
//       email,
//       position,
//       publications: [],
//       books: [],
//     },
//     (err, staffMember) => {
//       if (err) {
//         return console.error("Error" + err);
//       } else {
//         res.json({ msg: "Staff member created", staffMember, hash });
//       }
//     }
//   );
// });

// router.post("/sendEmail", async (req, res) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const url = `https://onjcripip.herokuapp.com/register?${req.body.hash}`;
//   const msg = {
//     to: req.body.email,
//     from: "D.Fairlie@latrobe.edu.au",
//     subject: "ONJCRI repository register",
//     text: "You have now been regsitered for the ONJCRI Performance and Impact App:",
//     html: `<p>Click this link to create a password and login:</p><a href=${url}>REGISTER PASSWORD</a>`,
//   };

//   try {
//     await sgMail.send(msg);
//     res.json({ msg: `Message sent to ${req.body.email}` });
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// });

// router.post("/sendResetEmail", async (req, res) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const url = `https://onjcripip.herokuapp.com/forgotPasswordRegister?${req.body.hash}`;
//   // const url = `http://localhost:3000/forgotPasswordRegister?${req.body.hash}`;
//   const msg = {
//     to: req.body.email,
//     from: "D.Fairlie@latrobe.edu.au",
//     subject: "ONJCRI repository register",
//     text: "You registerd to reset your password. Click this link to reset password:",
//     html: `<p>Click this link to reset ONJCRI Performnace and Impact Portal password:</p><a href=${url}>RESET PASSWORD</a>`,
//   };

//   try {
//     await sgMail.send(msg);
//     res.json({ msg: `Message sent to ${req.body.email}` });
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// });

// router.post("/addStaffPhoto", upload.single("file"), function (req, res) {
//   const photo = req.file;
//   const photoPath = req.file.location;
//   if (!photo) {
//     res.json({ msg: "You did not upload a photo" });
//   } else {
//     res.json({ photoPath });
//   }
// });

module.exports = router;
