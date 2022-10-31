import React from 'react';
import Tile from './components/Tile';
import data from './data.json'
import { Mini } from './types';
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

function App() {
  return (
    <Container>
      {data.sort((a, b) => a.name > b.name ? 1 : -1).map((mini: Mini) => (
        <Tile mini={mini} key={mini.fileName} />
      ))}
    </Container>
  );
}

export default App;
