function defineEndpoint(config) {
    return config;
}

var index = defineEndpoint(async (router, { services, getSchema }) => {
  const { ItemsService } = services;
  const schema = await getSchema();
  new ItemsService("transaction", {
    schema
  });
  router.get("/", async (req, res) => {
    res.send("items");
  });
});

export { index as default };
