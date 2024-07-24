import mongoose from "mongoose";

export async function connected() {
  try {
    await mongoose.connect(
      "mongodb+srv://harlemclaumann:xAsYVqpaNzGLJq80@cluster0.69j3tzl.mongodb.net/realtime"
    );
    console.log("Conectado ao banco de dados");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados.", error);
  }
}
