const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { v4: uuidv4 } = require("uuid");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// database
const db = getFirestore();

exports.testingroute = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return res.send({ message: "hii" });
  });
});

exports.createblog = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const id = uuidv4();
    const timestamp = FieldValue.serverTimestamp();
    const data = {
      id,
      timestamp,
      ...req.body,
    };
    try {
      const collectionRef = db.collection("blogs");
      await collectionRef.doc(id).set(data);

      return res
        .status(200)
        .json({ msg: `${id} has been saved on the cloud`, data });
    } catch (error) {
      return res.sendStatus(500).json({ error });
    }
  });
});

exports.blogs = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const collectionRef = db.collection("blogs");
      const query = await collectionRef.orderBy("timestamp", "desc").get();
      const blogs = query.docs.map((doc) => ({ ...doc.data() }));
      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});

exports.getblogbyID = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.query.id;

      if (!id) {
        return res.status(400).json({
          msg: "ID Parameter is missing",
        });
      }

      const docRef = db.collection("blogs").doc(id);
      const snapShot = await docRef.get();

      if (snapShot.exists) {
        return res.status(200).json({ id, blog: snapShot.data() });
      } else {
        return res.status(200).json({ id, msg: "Node Data Found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});

exports.updateblogbyId = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.query.id;
      const timestamp = FieldValue.serverTimestamp();
      const data = {
        timestamp,
        ...req.body,
      };
      if (!id) {
        return res.status(400).json({
          msg: "ID Parameter is missing",
        });
      }

      const docRef = db.collection("blogs").doc(id);
      const snapShot = await docRef.get();

      if (snapShot.exists) {
        await docRef.update(data);
        return res.status(200).json("blog ubdated successfullY");
      } else {
        return res.status(200).json({ id, msg: "Node Data Found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});

exports.deleteblogbyID = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.query.id;

      if (!id) {
        return res.status(400).json({
          msg: "ID Parameter is missing",
        });
      }

      const docRef = db.collection("blogs").doc(id);
      const snapShot = await docRef.get();

      if (snapShot.exists) {
        await docRef.delete();
        return res.status(200).json("delete  successfullY");
      } else {
        return res.status(200).json({ id, msg: "Node Data Found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});
