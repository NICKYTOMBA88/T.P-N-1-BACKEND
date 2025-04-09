import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { connectDB } from "./config/mongo";

connectDB()

//usuario
// name -> string , requerido
// email-> string , requerido , regex
// city -> string , requerido
// role -> string (admin, user) , requerido
// age  -> number , requerido


//Interface para typescript para mi sistema
interface UserIterface extends Document {
  name: string
  email: string
  city: string
  role?: "user" | "admin"
  age: number
}

//Esquema o molde para los datos una vez que son enviados a la base de datos
// Un esquema espera a un objeto para definir todas las propiedades
// valida las propiedades antes de guardarlas en la base de datos
const userSchema: Schema = new Schema<UserIterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  city: { type: String, required: true },
  role: {
    type: String, required: true, enum: ["user", "admin"], default: "user"
  },
  age: { type: Number, required: true, min: 18, max: 100 }
}, { timestamps: false, versionKey: false })

userSchema.set("strict", true) //esto es para que no acepte cualquier propiedad que se agregue

const User = mongoose.model<UserIterface>("User", userSchema)

// Es una funcion asyncrona por que esto va a la base de datos e intenta hacer algo en este caso crear un usuario
const createUser = async () => {
  try {
    const user: UserIterface = new User({
      name: "Mariano",
      email: "mariano@gmail.com",
      city: "Mendoza",
      age: 45,
      role: "user"
    })

    await user.save() //Quiere decir inserOne() en mongodb
    console.log("Usuario registrado")
  } catch (error) {
    console.log("error al registrar el usuario.", error)
  }
}


const getUser = async () => {
  try {
    const user = await User.find({}, { _id: 0 }) //find() es para buscar en la base de datos algun usuario, ademas usamos proyeccion en el segundo objeto en el parametro de find.
    console.log(user)
  } catch (error) {
    console.log("error al mostrar usuarios", error)
  }
}


const getUserById = async (id: mongoose.Types.ObjectId) => {
  try {
    const user = await User.findById(id)
    console.log(user)
  } catch (error) {
    console.log("error al mostrar usuarios", error)
  }
}

const id = new mongoose.Types.ObjectId("67f67d6475f25f426a0a22d6")

getUserById(id); 