import React from 'react'
import { Mini } from '../types'
import styled from '@emotion/styled'

type Props = {
  mini: Mini
}

const TileContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`

export default function Tile(props: Props) {
  const imgUrl = `https://res.cloudinary.com/adventcalendar/image/upload/w_200/miniatures/${props.mini.fileName}`
  return (
    <TileContainer>
      <img src={imgUrl} loading="lazy" alt={props.mini.name}/>
    </TileContainer>
  )
}