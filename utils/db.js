import mongoose from 'mongoose';

export const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    connection.conn = mongoose.connection;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
  connection.conn = mongoose.connection;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
      connection.conn = null;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;