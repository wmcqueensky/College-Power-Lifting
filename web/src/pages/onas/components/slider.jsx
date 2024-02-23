import React from 'react'
import {Slide} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import manPhoto from '../images/mezczyzni.png'
import womanPhoto from '../images/panie.png'
import paraolimpicsPhoto from '../images/paraolimpijczycy.png'
import familyPhoto from '../images/rodzina.png'
import {Box} from '@chakra-ui/react'

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh',
  width: '75vw',
  overflow: 'hidden',
  backgroundSize: 'cover',
  margin: 'auto',
}

const slideImages = [
  {
    url: manPhoto,
  },
  {
    url: womanPhoto,
  },
  {
    url: paraolimpicsPhoto,
  },
  {
    url: familyPhoto,
  },
]

const Slideshow = () => {
  return (
    <Box p="8" h="100vh" w="100vw">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <Box key={index} {...divStyle} backgroundImage={`url(${slideImage.url})`} />
        ))}
      </Slide>
    </Box>
  )
}

export default Slideshow