import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const getImage = async (req, res) => {    
    const __filename = fileURLToPath(import.meta.url);  
    const __dirname = path.dirname(__filename);


    try{
    const filePath = `${req.params.folder}/${ req.params.file}`
        const pathImage = path.join(__dirname, "../assets/", filePath);
        console.log(pathImage)
        if (!fs.existsSync(pathImage) || !fs.statSync(pathImage).isFile()) {
            return res.status(400).json("Archivo no encontrado");
        }
        
        return res.sendFile(pathImage);
    } catch (error) {
        console.log(error);
        return res.status(400).json("Algo salió mal, inténtalo de nuevo");
    }
};

export default getImage