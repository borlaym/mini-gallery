import React, { useCallback, useState } from 'react';
import Tile from './components/Tile';
import data from './data.json'
import { Mini } from './types';
import styled from '@emotion/styled'
import logo from './logo.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`

const Search = styled.input`
  width: 300px;
  padding: 5px;
  display: block;
  margin: 30px auto;
  font-size: 20px;
  outline: none;
`

const FullImage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 90%;
    max-height: 90%;
    cursor: pointer;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  }
`

const Logo = styled.img`
  max-height: 200px;
  max-width: 90%;
  margin: 10px auto;
  display: block;
`

const Description = styled.p`
  text-align: center;
  max-width: 400px;
  margin: 10px auto;
`

const NewToggle = styled.label`
  display: block;
  text-align: center;
  max-width: 400px;
  margin: 10px auto;
`

function App() {
  const [query, setQuery] = useState("")
  const [fullImage, setFullImage] = useState<Mini | null>(null)
  const [newOnly, setNewOnly] = useState(false)

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    setQuery(value)
    if (value !== "") {
      gtag('event', 'search', {
        "v": event.target.value
      });
    }
  }, [])

  const handleTileClick = useCallback((fileName: string) => {
    const mini = data.find(mini => mini.fileName === fileName)
    if (mini) {
      setFullImage(mini)
    }
  }, [])

  const handleCancel = useCallback(() => {
    setFullImage(null)
  }, [])

  const toggleNewOnly = useCallback(() => {
    setNewOnly(v => !v)
  }, [])

  const dataToShow = data
    .filter(a => (!newOnly || a.new))
    .sort((a, b) => {
      if (a.name === b.name) {
        return a.fileName > b.fileName ? 1 : -1
      }
      return a.name > b.name ? 1 : -1
    })
    .filter(a => a.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <Logo src={logo} />
      <Description>Itt megtalálod klubunk mini gyűjteményét! A lista folyamatosan bővül, a friss érkezésekért kövesd <a href="https://www.facebook.com/vas.es.varazs">facebook oldalunkat</a>!</Description>
      <Search type="search" value={query} onChange={handleInputChange} placeholder="Keresés..." />
      <NewToggle><input type="checkbox" checked={newOnly} onChange={toggleNewOnly}/> Csak az újdonságok mutatása</NewToggle>
      <Container>
        {dataToShow.map((mini: Mini) => (
          <Tile
            mini={mini}
            key={mini.fileName}
            onClick={handleTileClick}
          />
        ))}
      </Container>
      {fullImage && (
        <FullImage onClick={handleCancel}>
          <img src={`https://res.cloudinary.com/adventcalendar/image/upload/miniatures/${fullImage.fileName}`} alt={fullImage.fileName} />
        </FullImage>
      )}
    </div>

  );
}

export default App;
