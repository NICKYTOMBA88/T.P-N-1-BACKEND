import mongoose, { Document, get, Schema } from "mongoose";
import { connectDB } from "./config/mongo";

connectDB();

// Interface
interface TireSize extends Document {
  width: number;
  profile: number;
  rolled: number;
  price: number;
}

// Esquema
const tireSchema: Schema = new Schema<TireSize>({
  width: { type: Number, required: true },
  profile: { type: Number, required: true },
  rolled: { type: Number, required: true },
  price: { type: Number, required: true },
});

tireSchema.set("strict", true);

const Tire = mongoose.model<TireSize>("Tire", tireSchema);

// Crear neumático
const createTire = async () => {
  try {
    const tire = new Tire({
      width: 175,
      profile: 70,
      rolled: 14,
      price: 90000
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
      console.log(`ID: ${t._id} - ${t.width}/${t.profile}-${t.rolled} $${t.price}`,);
    });
  } catch (error) {
    console.log("Error al obtener neumáticos:", error);
  }
};

// Actualizar neumático
const updateTire = async (id: string, body: Partial<TireSize>) => {
  try {
    const updatedTire = await Tire.findByIdAndUpdate(id, body, { new: true });
    if (!updatedTire) {
      console.log("No se encuentra el neumático");
    } else {
      console.log("Neumático actualizado:", updatedTire);
    }
  } catch (error) {
    console.log("Error al actualizar neumático:", error);
  }
};

// Eliminar neumático
const deleteTire = async (id: string) => {
  const deletedTire = await Tire.findByIdAndDelete(id)
  try {
    if (!deletedTire) {
      console.log("no se encuentra el neumático");
    } else {
      console.log(deletedTire, "Neumatico borrado");
    }
  } catch (error) {
    console.log("no se borro el neumatico", error)
  }

};

