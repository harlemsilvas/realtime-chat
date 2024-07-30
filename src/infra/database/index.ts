import mongoose from 'mongoose';

export async function connect() {
  if (!process.env.MONGO_DB_HOST) {
    throw new Error('.env not found');
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_HOST);
    //console.log("Conectado ao banco de dados");
  } catch (error) {
    console.log('Erro ao conectar ao banco de dados.', error);
  }
}
