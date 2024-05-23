const LessonAudio = require("../models/LessonAudio")

const getAllLessonAudio = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const lessonAudio = await LessonAudio.find({}).lean()
    if (!lessonAudio?.length) {
        return res.status(400).json({ message: "no LessonAudio found...." })
    }
    res.json(lessonAudio)
}

const createNewLessonAudio = async (req, res) => {
    if(req.user.roles!='admin' && req.user.roles!='secretary'){
        return res.status(400).json({ message: "not permissiend" })
    }

    const { path,name,role} = req.body

    if (!path || !name||!role ) {
        return res.status(400).json({ message: "fields are required" })
    }
    const lessonAudio = await LessonAudio.find({ name: name }).lean()

    if (!lessonAudio?.length) {
        const lessonAudio = await LessonAudio.create({  path,name,role })
        if (lessonAudio) {
            return res.status(201).json({ message: "new lessonAudio created" })
        }
        else {
            return res.status(400).json({ message: "Invalid lessonAudio" })
        }
    }
    else {
        return res.status(400).json({ message: "Invalid lessonAudio" })
    }


}

const upDateLessonAudio = async (req, res) => {
    if(req.user.roles!='admin' && req.user.roles!='secretary'){
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id,path,name,role} = req.body

    if (!id ||! path ||!name||!role) {
        return res.status(400).json({ message: "fields are required" })
    }
    const lessonAudio = await LessonAudio.findById(id).exec()

    if (!lessonAudio) {
        return res.status(400).json({ message: "lessonAudio not found" })
    }
    lessonAudio.path=path
    lessonAudio.name=name
    lessonAudio.role=role

    const updateLessonAudio= await lessonAudio.save()

    res.json(`${updateLessonAudio.name} updated`)
    
}


const getLessonAudioByName = async (req, res) => {
    const { name } = req.params
    const lessonAudio = await LessonAudio.find({name:name}).lean()

    if (!lessonAudio) {
        return res.status(400).json({ message: "No LessonAudio found" })
    }
    res.json(lessonAudio)

}
const deleteLessonAudio = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id } = req.body

    const lessonAudio = await LessonAudio.findById(id).exec()

    if (!lessonAudio) {
        return res.status(400).json({ message: "LessonAudio not found" })
    }
    const result = await lessonAudio.deleteOne()
    res.json(`LessonAudio ${LessonAudio.name} ID ${LessonAudio.id} deleted`)
}




module.exports = { getAllLessonAudio, createNewLessonAudio, upDateLessonAudio, getLessonAudioByName,deleteLessonAudio }