import sequelize from  "../db/db.js"
import Songs from "../models/songs.model.js"
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { error } from "console";

const exec = promisify(execCallback);

export const deleteSongById =  async(req, res) =>{
    try{
        const songId = req.params.id    
        await Songs.destroy({where : {id : songId}})
        return res.status(200).json({msg : "song deleted"})    


    }catch(erro){
        console.log(error)
        return res.status(400).json({error : error})    
    }  
}

export const getSongById = async(req, res) =>{
    const songId = req.params.id    
    try{        
        const song = await Songs.findByPk(songId)
        if(!song)
            return res.status(400).json({error : "something went wrong"})

        return res.status(200).json(song)
    }catch(erro){
        console.log(error)
        return res.status(400).json({error : error})    
    }  
}

export const updateSong = async(req, res) =>{
    const songId = req.params.id
    const songBody = req.body
    try{        
        const song = await Songs.findByPk(songId)
        if(!song)
            return res.status(400).json({error : "something went wrong"})
        await song.update(songBody)
        return res.status(200).json({msg : "Song updated"})
    }catch(erro){
        console.log(error)
        return res.status(400).json({error : error})    
    }  
}

export const getAllSong = async(req, res) =>{
    try{
        const song = await Songs.findAll()
        return res.status(200).json(song)
    }catch(erro){
        console.log(error)
        return res.status(400).json({error : error})    
    }    
}


export const addSong = async (req, res) => {
    const { name, url, artist, album } = req.body;

    const transaction = await sequelize.transaction();
    try {
        const song = await Songs.create({
            name,
            album,
            artist
        }, { transaction });

        if (!song) {
            await transaction.rollback();
            return res.status(400).json({ error: "Something went wrong" });
        }

        const command = `yt-dlp -x --audio-format mp3 --audio-quality 0 --windows-filenames --write-thumbnail --embed-thumbnail --no-playlist --add-metadata -o "./assets/${song.id}/${song.id}.%(ext)s" "${url}"`;

        const { stdout, stderr } = await exec(command);

        if (stderr && stderr.trim() !== '') {
            await transaction.rollback();
            return res.status(500).json({ msg: `⚠️ Something Went Wrong` });
        }

        await transaction.commit();
        return res.status(200).json({ msg: `✅ Song  ${song.name} Added` });

    } catch (error) {
        await transaction.rollback();
        console.error("❌ Error in addSong:", error);
        return res.status(500).json({ error: error.message || error });
    }
};
