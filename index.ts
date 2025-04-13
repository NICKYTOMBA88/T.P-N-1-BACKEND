import mongoose, { Document, Schema } from "mongoose";
import { connectDB } from "./config/mongo";

connectDB();

// Interface
interface TireSize extends Document {
  width: number;
  profile: number;
  rolled: number;
}

// Esquema
const tireSchema: Schema = new Schema<TireSize>({
  width: { type: Number, required: true },
  profile: { type: Number, required: true },
  rolled: { type: Number, required: true },
});

tireSchema.set("strict", true);

const Tire = mongoose.model<TireSize>("Tire", tireSchema);

// Crear neumático
const createTire = async () => {
  try {
    const tire = new Tire({
      width: 185,
      profile: 65,
      rolled: 14,
    });

    await tire.save();
    console.log("Neumático agregado");
  } catch (error) {
    console.log("Error al agregar neumático:", error);
  }
};

// Mostrar neumáticos
const getTires = async () => {
  try {
    const tires = await Tire.find();
    tires.forEach((t) => {
      console.log(`${t.width}/${t.profile}-${t.rolled}`);
    });
  } catch (error) {
    console.log("Error al obtener neumáticos:", error);
  }
};

// const getUserByName = async (name: string) => {
//   try {
//     const users = await getUser();
//     const user = await User.findOne({ name: { $regex: name, $options: "i" } })
//     console.log(user)
//   } catch (error) {
//     console.log("error al mostrar usuarios", error)
//   }
// }


// const updateUser = async (id: string, body: object) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(id, body, { new: true })
//     if (!updatedUser) {
//       console.log("no se encuentra el usuario");
//     } else {
//       console.log(updatedUser);
//     }

//   } catch (error) {
//     console.log("error al actualizar usuario")
//   }
// }


// // deleteUser("67f67d6475f25f426a0a22d6")
// const deleteUser = async (id: string) => {
//   const deletedUser = await User.findByIdAndDelete(id)
//   try {
//     if (!deletedUser) {
//       console.log("no se encuentra el usuario");
//     } else {
//       console.log(deletedUser, "Usuario borrado");
//     }
//   } catch (error) {
//     console.log("no se borro el usuario", error)
//   }

// };

getTires()