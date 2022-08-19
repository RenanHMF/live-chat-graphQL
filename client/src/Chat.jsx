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
  return (
    <>
      {data.messages.map(({ id, user : messageUser, content }) => (
      <div
        style = {{
          display : "flex",
          justifyContent : user === messageUser ? "flex-end" : "flex-start",
          paddingBottom : "1em",
        }}
      >
        <div
          style = {{
            background : user === messageUser ? "#58bf56" : "#e5e6ea",
            color : user === messageUser ? "white" : "black",
            padding : "1em",
            borderRadius : "1em",
            maxWidth : "60%",
          }}
        >
          {content}
        </div>
      </div>
      ))}
    </>
  );
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