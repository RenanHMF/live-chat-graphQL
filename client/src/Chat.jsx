import React from 'react';
import { ReactDOM } from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { Container } from 'shards-react';
 
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const GET_MESSAGE = gql `
query {
  messages{
    id
    content
    user
  }
}`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGE);
  if (!data){
    return null;
  }
  return JSON.stringify(data);
};

const Chat = () => {
  return (
    <Container>
      <Messages user="Renana" />
    </Container>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)