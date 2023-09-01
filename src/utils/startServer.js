import sequelizeObj from "../database/sequelizeObj.js";

export const startServer = async (app) => {
  const port = process.env.PORT || 5000;

  try {
    await sequelizeObj.sync();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
};
