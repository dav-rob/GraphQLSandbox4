const { ApolloServer } = require('apollo-server');
const { bootstrap: bootstrapGlobalAgent } = require('global-agent');
const typeDefs = require('./schema');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

setProxyParams();
const store = createStore();

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});

function setProxyParams() {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // process.env.GLOBAL_AGENT_HTTP_PROXY="http://localhost:8866/";
  // process.env.NODE_EXTRA_CA_CERTS = "/Users/davidroberts/projects/GraphQL/ApolloTutorial/fullstack-tutorial/start/server/FiddlerRootCertificate.crt";
  // //console.log(` Node proxy cert at: ${process.env.NODE_EXTRA_CA_CERTS}`);
  //console.log(` Node proxy endpoint at: ${process.env.GLOBAL_AGENT_HTTP_PROXY}`);
  console.log(process.env)
  bootstrapGlobalAgent();
}

