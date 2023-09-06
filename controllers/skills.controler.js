const Skill = require ('../models/skill');
const {Op} = require('sequelize');

//apis

const findAll = async(req,res)=>{
    const {nameSkill}= req.query;
    try {
        const skills = await Skill.findAll({

            where:{
                nameSkill:{
                    [Op.like]:`%${nameSkill}%`
                }
            }
        });
        if(!skills || skills.length === 0){
            throw{
                status: 404,
                message:'No se encuentra la habilidad ingresada!'
            };
        }
        return res.status(200).json({skills})
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({message: error.message || 'error interno del servidor al obtener las habilidades'});
    };
};
const findOne = async (req, res)=>{
    const {id} = req.params.id;
    try {
        const skill = Skill.findByPk();
        if(!skill){
            throw({
                status:404,
                message:"La habilidad buscada no existe!"
            });
        }
        return res.status(200).json(skill);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message || 'Error interno del servidor!' });
    };
};
const createSkill = async(req,res)=>{
    const {nameSkill} = req.body;
    try {
        const skill = await Skill.findOrCreate({
            where:{
                nameSkill
            },
        });
        if(!skill){
            throw({
                status:400,
                message:'Error al crear la Habilidad'
            });
        };
        return res.status(201).json({skill});
    } catch (error) {
        console.log(error);
        return res.status(error.status||500).json({message:error.message|| 'Error interno del servidor'});
    };
};
const skillUpdate = async (req,res)=>{
    const idSkill = req.params.id;
    const {nameSkill} = req.body;

    try {
        const skill = await Skill.findByPk(idSkill);

        skill.update({
            nameSkill
        });
        if(!skill){
            throw({
                status:400,
                message:'Error al actualizar la Habilidad!'
            });
        };
        return res.status(200).json({message:'Actualizado con Éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(error.status||500).json({message: error.message || 'Error interno del Servidor!'});
    };
};

const deleteSkill = async(req,res)=>{
    const idSkill = req.params.id;
    try {
        const skill = await Skill.destroy({
            where:{
                idSkill
            }
        });
        if(!skill){
            throw({
                status:400,
                message:'Error al eliminar la Habilidad!'
            });
        };
        return res.status(200).json({message:'Habilidad Eliminada con Éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({message: error.message || 'Error interno del Servidor!'})
    };
};
module.exports = {
    findAll,
    findOne,
    createSkill,
    skillUpdate,
    deleteSkill
};