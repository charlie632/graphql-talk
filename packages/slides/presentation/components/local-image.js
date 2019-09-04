import React from 'react'
import preloader from 'spectacle/lib/utils/preloader'
import {Image} from 'spectacle'
const images = {
  gqldocs: require('../../assets/gqldocs.gif'),
  
  
  
}

preloader(images)

const LocalImage = ({ image }) => (
  <Image src={images[image].replace('/', '')}/>

)

export default LocalImage
