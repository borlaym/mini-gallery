import React, { useCallback, useState } from 'react';
import Tile from './components/Tile';
import data from './data.json'
import { Mini } from './types';
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`

const Search = styled.input`
  width: 300px;
  padding: 10px;
  display: block;
  margin: 30px auto;
  border-radius: 10px;
  font-size: 20px;
`

function App() {
  const [query, setQuery] = useState("")

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }, [])

  const dataToShow = data
    .sort((a, b) => a.name > b.name ? 1 : -1)
    .filter(a => a.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <Search type="search" value={query} onChange={handleInputChange} />
      <Container>
        {dataToShow.map((mini: Mini) => (
          <Tile mini={mini} key={mini.fileName} />
        ))}
      </Container>
    </div>

  );
}

export default App;
