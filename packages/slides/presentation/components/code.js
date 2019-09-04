import React from 'react'
import {CodePane} from 'spectacle'

const Code = ({lang, src, rawSrc}) => (
  <CodePane
    style={{maxHeight: '500px', overflowY: 'auto'}}
    lang={lang}
    theme="external"
    source={rawSrc ? rawSrc : require(`raw-loader!../../assets/${src}`)}
  />
)

export default Code
