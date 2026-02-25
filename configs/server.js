'use strict';
import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validate-cant-request.js';
import UsuarioRouters from '../src/usuario/usuario.routes.js'

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    app.use(helmet());
    app.use(cors()); 
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) =>{
    app.use('/Logica/v1/User', UsuarioRouters)
}

const conectarDB = async() =>{
    try {
        await dbConnection();
        console.log('Successful connection to the database')
    } catch (error) {
        console.log('Failed to connect to database', error)
    }
}

export const initServer = async() =>{
    const app = express();
    const port = process.env.PORT || 3001; 
    
    try {
        middlewares(app);
        await conectarDB(); 

        routes(app);
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on port ${port}`);
        });
        
    } catch (err) {
        console.log(`server init failed: ${err}`);
    }
}