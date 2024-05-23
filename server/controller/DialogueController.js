const Dialogues = require("../models/Dialogue")

const getAllDialogues = async (req, res) => {
   const {role}=req.params
    let dialogues = await Dialogues.find().lean().populate("userId", {name: 1,roles:1})
    if (!dialogues?.length) {
        return res.status(400).json({ message: "no dialogues found...." })
    }
    dialogues=dialogues.filter(dialogue=>dialogue.workerStatus==role)
    res.json(dialogues)
}



const createNewDialogue = async (req, res) => {
    
    const { dialogueName,dialogue, userId, workerStatus} = req.body
console.log(dialogueName,dialogue, userId, workerStatus);
    if (!dialogue || !userId || !workerStatus ||! dialogueName) {
        return res.status(400).json({ message: "fields are required" })
    }
    const dialogues = await Dialogues.find({ dialogueName: dialogueName }).lean()

    if (!dialogues?.length) {
        const dialogue1 = await Dialogues.create({ dialogueName, dialogue, userId, workerStatus })
        if (dialogue1) {
            return res.status(201).json({ message: "new dialogue created" })
        }
        else {
            return res.status(400).json({ message: "Invalid dialogue" })
        }
    }
    else {
        return res.status(400).json({ message: "Invalid dialogue name" })
    }


}

const upDateDialogue = async (req, res) => {
    const {id}=req.params
    const {message,userId} = req.body
console.log(id,message,userId);
    if (!id ||! message) {
        return res.status(400).json({ message: "fields are required" })
    }
    const dialogue = await Dialogues.findById(id).exec()

    if (!dialogue) {
        return res.status(400).json({ message: "dialogue not found" })
    }
    const arr=[...dialogue.dialogue,{message,userId}]
    dialogue.dialogue=arr
    const updateDialogue= await dialogue.save()

    res.json(`${updateDialogue.dialogueName} updated`)
    
}
const upDateDialogueRead = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const {id}=req.params
    const dialogue = await Dialogues.findById(id).exec()

    if (!dialogue) {
        return res.status(400).json({ message: "Discussion not found" })
    }
    dialogue.read=true
    const updateDialogue= await dialogue.save()
    res.json(`${updateDialogue.dialogueName} updated`)
}


const getDialogueByUserId = async (req, res) => {
    const { id } = req.params
    const dialogue = await Dialogues.find({userId:id}).lean().populate("userId", {name: 1,roles:1})

    if (!dialogue) {
        return res.status(400).json({ message: "No dialogue found" })
    }
    res.json(dialogue)

}
const getDialogueById = async (req, res) => {
    const { id } = req.params
    const dialogue = await Dialogues.find({_id:id}).lean()

    if (!dialogue) {
        return res.status(400).json({ message: "No dialogue found" })
    }
    res.json(dialogue)

}




module.exports = { getAllDialogues, createNewDialogue, upDateDialogue, getDialogueByUserId ,upDateDialogueRead,getDialogueById}