import asyncHandler from '../middleware/asyncHandler.min.js'
import Tool from '../models/tool.js'

const getTools = asyncHandler(async (req, res) => {
    const tools = await Tool.find()
    res.json(tools)
})

const getToolById = asyncHandler(async (req, res) => {
    const tool = await Tool.findById(req.params.id)
    res.json(tool)
})

const getToolsByWard = asyncHandler(async (req, res) => {
    const tools = await Tool.find({ ward: req.params.ward })
    res.json(tools)
})

const createTool = asyncHandler(async (req, res) => {
    const tool = await Tool.create(req.body)
    res.json(tool)
})

const updateTool = asyncHandler(async (req, res) => {
    const tool = await Tool.findById(req.params.id)
    if (tool) {
        tool.ward = req.body.ward || tool.ward
        tool.stri = req.body.stri || tool.stri
        tool.sbmr = req.body.sbmr || tool.sbmr
        tool.sbu = req.body.sbu || tool.sbu
        tool.vsrc = req.body.vsrc || tool.vsrc
        tool.vtpc = req.body.vtpc || tool.vtpc
        tool.sutftm = req.body.sutftm || tool.sutftm
        tool.vso = req.body.vso || tool.vso
        tool.ls = req.body.ls || tool.ls
        const updatedTool = await tool.save()
        console.log(updatedTool)
        res.json(updatedTool)
    } else {
        res.status(404)
        throw new Error('Tool not found')
    }
})

const deleteTool = asyncHandler(async (req, res) => {
    const tool = await Tool.findById(req.params.id)
    if (tool) {
        await tool.remove()
        res.json({ message: 'Tool removed' })
    } else {
        res.status(404)
        throw new Error('Tool not found')
    }
})

export {
    getTools,
    getToolById,
    getToolsByWard,
    createTool,
    updateTool,
    deleteTool
}

