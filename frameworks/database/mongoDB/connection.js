export default function mongoConnection(mongoose, config, options) {
  function connectToMongo() {
    mongoose
      .connect(config.mongo.uri, options)
      .then(
        () => {},
        (err) => {
          console.info('Mongodb error', err);
        },
      )
      .catch((err) => {
        console.log('ERROR:', err);
      });
  }

  mongoose.connection.on('connected', () => {
    console.info('Connected to MongoDB!');
  });

  mongoose.connection.on('connecting', () => {
    console.info('MongoDB connecting!');
  });

  mongoose.connection.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });

  mongoose.connection.on('disconnected', () => {
    console.error(
      `MongoDB disconnected! Reconnecting in ${
        options.connectTimeoutMS / 1000
      }...`,
    );
    setTimeout(() => connectToMongo(), options.connectTimeoutMS);
  });

  return {
    connectToMongo,
  };
}
