import User from "/models/User";
import connectDB from "/lib/database";
import middleware from "/middleware/middleware";
import nextConnect from "next-connect";
import uploadImage from "/lib/utils/image";

const handler = nextConnect()
handler.use(middleware)

// GET all users
handler.get(async (req, res) => {
  await connectDB();

  var users = await User.find()
  res.status(200).json(users);
});



// POST a new profile
handler.post(async (req, res) => {
  await connectDB();
  
  try {
    const userJSON = JSON.parse(req.body.content);
    const user = await new User(userJSON);
    const userImageStorage = user._id;

    // upload profile photo into s3
    const profilePhoto = await uploadImage(req.files.profilePhoto[0], userImageStorage, 'profilePhoto');
    if (!profilePhoto) {
      throw new Error('Could not upload profile photo');
    }
    user.profilePhoto = profilePhoto;
    
    // upload portfolio photos into s3
    for (var i = 1; i <= 4; i++) {
      if(!req.files['portfolio' + i]) {
        break;
      }

      const photo = req.files['portfolio' + i][0]
      const portfolioPhoto = await uploadImage(photo, userImageStorage, 'portfolio' + i);
      if (!portfolioPhoto) {
        throw new Error('Could not upload portfolioPhoto' + photo.originalFilename);
      }

      for (var j = 0; j < user.portfolioProjects.length; j++) {
        if (user.portfolioProjects[j].thumbnail === `portfolio${i}-${photo.originalFilename}`) {
          user.portfolioProjects[j].thumbnail = portfolioPhoto;
          break;
        }
      }
    }

    // save profile into db
    const newUser = await user.save();
    res.status(201).json(newUser);


  } catch (err) {
    if (err.name == "ValidationError") {
      res.status(400).json("ValidationError: " + err.message);
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});


export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;