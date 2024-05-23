const express = require("express")
const router = express.Router()
const LessonAudioController = require("../controller/LessonAudioController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", LessonAudioController.getAllLessonAudio)
router.post("/", LessonAudioController.createNewLessonAudio)
router.put("/", LessonAudioController.upDateLessonAudio)
router.get("/id", LessonAudioController.getLessonAudioByName)
router.delete("/", LessonAudioController.deleteLessonAudio)
module.exports = router