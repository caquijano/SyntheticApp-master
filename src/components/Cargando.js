import React from 'react';
import {ActivityIndicator} from 'react-native'
import { Container, Header, Content, Spinner } from 'native-base';
export default function Cargando() {
    return (
      <Container>
        <Content style={{ marginTop: "50%"}}>
          <Spinner color='green' size='large' />
        </Content>
      </Container>
    );
}