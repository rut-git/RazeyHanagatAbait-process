const LessonVideo = require("../models/LessonVideo")

const getAllLessonVideo = async (req, res) => {
    // if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
    //     return res.status(400).json({ message: "not permissiend" })
    // }
    const lessonVideo = await LessonVideo.find({}).lean()
    if (!lessonVideo?.length) {
        return res.status(400).json({ message: "no LessonVideo found...." })
    }
    res.json(lessonVideo)
}
const createNewLessonVideo = async (req, res) => {
    if (!req.user.roles.includes('admin') && !req.user.roles.includes('secretary')) {
        return res.status(400).json({ message: "Not permitted" });
    }

    const { name, role } = req.body;
    if (!name || !role) {
        console.log(role);
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "File is required" });
    }

    const imageUrl = req.file.path;
    const existingLessonVideo = await LessonVideo.findOne({ name }).lean();

    if (!existingLessonVideo) {
        try {
            const lessonVideo = await LessonVideo.create({ path: imageUrl, name, role });
            return res.status(201).json({ message: "New lesson video created" });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid lesson video" });
        }
    } else {
        return res.status(400).json({ message: "Lesson video already exists" });
    }
};


// const createNewLessonVideo = async (req,res) => {
    
//     if(!req.user.roles=='admin' && !req.user.roles=='secretary'){
//         return res.status(400).json({ message: "not permissiend" })
//     }
//     const {name,role} = req.body
//     console.log(role);
//     if (!name ||!role) {
//         return res.status(400).json({ message: "fields are required" })
//     }
//     console.log(req.file);
//     const imageUrl = req.file.path; 
//     // const videoUrl = req.file.path; 
//     const lessonVideo = await LessonVideo.find({ name: name }).lean()
//     // console.log(lessonVideo);
//     if (!lessonVideo?.length) {
//         console.log("Aaaaaaaa",{imageUrl,name,role });
//         const lessonVideo = await LessonVideo.create({path:imageUrl,name,role })
//         if (lessonVideo) {
//             return res.status(201).json({ message: "new lessonVideo created" })
//         }
//         else {
//             return res.status(400).json({ message: "Invalid lessonVideo" })
//         }
//     }
//     else {
//         return res.status(400).json({ message: "Invalid lessonVideo" })
//     }
// }
const upDateLessonVideo = async (req, res) => {
    if(req.user.roles!='admin' && req.user.roles!='secretary'){
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id,path,name,role} = req.body

    if (!id ||! path ||!name||!role) {
        return res.status(400).json({ message: "fields are required" })
    }
    const lessonVideo = await LessonVideo.findById(id).exec()

    if (!lessonVideo) {
        return res.status(400).json({ message: "lessonVideo not found" })
    }
    lessonVideo.path=path
    lessonVideo.name=name
    lessonVideo.role=role

    const updateLessonVideo= await lessonVideo.save()

    res.json(`${updateLessonVideo.name} updated`)
    
}


const getLessonVideoByName = async (req, res) => {
    const { id } = req.params
    const lessonVideo = await LessonVideo.findById(id).lean()

    if (!lessonVideo) {
        return res.status(400).json({ message: "No LessonVideo found" })
    }
    res.json(lessonVideo)

}
const getLessonVideoByRole = async (req, res) => {
    const { role } = req.params
    let arr=[]
    switch (role) {
        case "refresh":
            arr=["refresh"]
            break
        case "leap":
            arr=["leap","refresh"]
            break
        case "engaged":
            arr=["engaged"]
            break
        case "secretary":
            arr=["refresh","leap","engaged"]
            break
        case "admin":
            arr=["refresh","leap","engaged"]
            break
        
    }
    const lessonVideo = await LessonVideo.find({role:{$in:arr}}).lean()

    if (!lessonVideo) {
        return res.status(400).json({ message: "No LessonVideo found" })
    }
    res.json(lessonVideo)

}


const deleteLessonVideo = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id } = req.body

    const lessonVideo = await LessonVideo.findById(id).exec()

    if (!lessonVideo) {
        return res.status(400).json({ message: "LessonVideo not found" })
    }
    const result = await lessonVideo.deleteOne()
    res.json(`LessonVideo ${LessonVideo.name} ID ${LessonVideo.id} deleted`)
}




module.exports = { getAllLessonVideo, createNewLessonVideo, upDateLessonVideo, getLessonVideoByName,deleteLessonVideo,getLessonVideoByRole }