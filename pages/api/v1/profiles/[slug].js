import User from "/models/User";
import connectDB from "/lib/database";

export default async function handler(req, res) {

  await connectDB();

  switch (req.method) {

    // find one user by slug
    case "GET":
        var user = await User.findOne( { slug: req.query.slug });

        if (user) {
          res.status(200).json(user);
        } else {
          res.status(400).json({ error: 'User not found.' });
        }
        break;

    default:
        res.status(400).json({ error: 'Invalid API endpoint.' });
        break;
  }
}

