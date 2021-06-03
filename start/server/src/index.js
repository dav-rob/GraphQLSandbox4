const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const { bootstrap: bootstrapGlobalAgent } = require('global-agent');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

console.log("USE_PROXY=" + process.env.USE_PROXY)
if (process.env.USE_PROXY) {
    // Setup global support for environment variable based proxy configuration.
    bootstrapGlobalAgent();
}

const store = createStore();
const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.listen({port: 4010}).then(() => {
  console.log(`
    Server is running!
    Listening on port 4010
    Explore at https://studio.apollographql.com/dev
  `);
});

