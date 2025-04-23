import mongoose, { Document, get, Schema } from "mongoose";
import { connectDB } from "./config/mongo";

connectDB();

// Interface
interface TireSize extends Document {
  width: number;
  profile: number;
  rolled: number;
  brand: string;
  price: number;
}

// Esquema
const tireSchema: Schema = new Schema<TireSize>({
  width: { type: Number, required: true },
  profile: { type: Number, required: true },
  rolled: { type: Number, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
});

tireSchema.set("strict", true);

const Tire = mongoose.model<TireSize>("Tire", tireSchema);

// Crear neumático
const createTire = async (tireData: {
  width: number;
  profile: number;
  rolled: number;
  brand: string;
  price: number;
}) => {
  try {
    const tire = new Tire(tireData);
    const savedTire = await tire.save();
    console.log("Neumático agregado:", savedTire);
    return savedTire;
  } catch (error: any) {
    return { message: error.message }
  }
};
// Mostrar neumáticos
const getTires = async () => {
  try {
    const tires = await Tire.find();
    tires.forEach((t) => {
      console.log(`ID: ${t._id} - Medida: ${t.width}/${t.profile}-${t.rolled} Marca:${t.brand} $${t.price}`,);
    });
  } catch (error) {
    console.log("Error al obtener neumáticos:", error);
  }
};

const getTiresById = async (id: string) => {
  try {
    const tire = await Tire.findById(id);
    if (!tire) {
      console.log("Neumático no encontrado");
    } else {
      console.log(`ID: ${tire._id} - ${tire.width}/${tire.profile}-${tire.rolled} ${tire.brand} $${tire.price}`);
    }
  } catch (error) {
    console.log("No se encontro el neumatico", error)
  }
}

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

export { createTire, getTires, updateTire, deleteTire, getTiresById };

