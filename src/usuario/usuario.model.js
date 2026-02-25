import { Schema, model } from "mongoose";

 const UserSchema = Schema (
    {
        name : {
            type: String,
            required: [true, "Name is required"],
            maxLength: [25, "Can't exceed 25 characters"]
        },
        monto:{
            type: Number, 
            required: [true, "monto is required"]
        },
        status: {
            type: String,
            enum: ["pagado", "pendiente", "rechazado"]
        },
        role: {
            type: String,
            enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
            default: "ADMIN_ROLE"
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('User', UserSchema);

