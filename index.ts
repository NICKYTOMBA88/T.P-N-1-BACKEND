import mongoose, { Document, Schema } from "mongoose";
import { connectDB } from "./config/mongo";

connectDB()

//usuario
// name -> string , requerido
// email-> string , requerido , regex
// city -> string , requerido
// role -> string (admin, user) , requerido
// age  -> number , requerido


//Interface para typescript para mi sistema
interface User extends Document {
  name: string
  email: string
  city: string
  role: "user" | "admin"
  age: number
}

//Esquema o molde para los datos una vez que son enviados a la base de datos
// Un esquema espera a un objeto para definir todas las propiedades
// valida las propiedades antes de guardarlas en la base de datos
const userSchema: Schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[._%+-]+@[a-zA-Z0-9.-]+\.{2,}$/, },
  city: { type: String, required: true },
  role: {
    type: String, required: true, enum: ["user", "admin"], default: "user"
  },
  age: { type: Number, required: true, min: 18, max: 100 }
}, { timestamps: false, versionKey: false })

userSchema.set("strict", true) //esto es para que no acepte cualquier propiedad que se agregue