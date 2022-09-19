const server = require("./src/app");
const { connection } = require("./src/db");
const { preloadProducts } = require("./preloadDevelopment");

const PORT = process.env.PORT || 3001;

connection.sync({ force: false }).then(async () => {
  server.listen(PORT, () => console.log(`Listening at port: ${PORT}`));
  try {
    //await preloadProducts();
  } catch (error) {
    console.log(error);
  }
});
