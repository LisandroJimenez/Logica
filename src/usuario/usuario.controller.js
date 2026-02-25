import {response} from "express"
import User from "./usuario.model.js"

export const getResults = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = {  }
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener usuarios",
            error
        })        
    }
}

export const createUser = async (req, res) =>{
    try {
        const data = req.body;

        const user = await User.create({
            name: data.name,
            monto: data.monto,
            status: data.status,
            role: data.role
        })
        return res.status(200).json({
            message: "User registered successfully",
            userDetails: {
                user: user.email
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "User registration failed",
            error: error.message
        })
    }

}




export const getTotals = async (req, res) => {
    try {
        const resultado = await User.aggregate([
            {
                $group: {
                    _id: null, 
                    totalPagado: { $sum: "$monto" }
                }
            }
        ]);

        const total = resultado.length > 0 ? resultado[0].totalPagado : 0;

        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({ message: "Error al calcular el total", error: error.message });
    }
}

export const getTotalUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userTotal = await User.findById(id);

        if (!userTotal) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        res.status(200).json({
            success: true, 
            msg: 'User found',
            userTotal
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error getting user',
            error: error.message
        });
    }
}

export const getMayor = async (req, res) => {
    try {
        const users = await User.find({ monto: { $gt: 199 } })
            .select('name monto'); 

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                msg: 'No se encontraron usuarios con monto mayor a 200'
            });
        }

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener los usuarios',
            error: error.message
        });
    }
}