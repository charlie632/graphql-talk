import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Redbox from 'redbox-react'
import {Deck, Slide} from 'spectacle'
import slides, {transitions} from './presentation/index.mdx'
import theme from './presentation/theme'
import {ApolloProvider} from '@apollo/react-hooks'
import {client} from './apollo'

require('normalize.css')

const CustomErrorReporter = ({error}) => <Redbox error={error} />

CustomErrorReporter.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
}

const creeperTransition = (transitioning, forward) => {
  const offset = forward ? 100 : -100
  return {
    transform: `
      translate3d(0,${transitioning ? offset : 0}%, 0)
    `,
  }
}

ReactDOM.render(
  <AppContainer errorReporter={CustomErrorReporter}>
    <ApolloProvider client={client}>
      <Deck
        transition={[creeperTransition]}
        transitionDuration={500}
        contentWidth={1500}
        theme={theme}>
        {slides.map((S, i) => {
          let transition = transitions[i] || null
          return <S transition={transition} key={`slide-${i}`} />
        })}
      </Deck>
    </ApolloProvider>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept(() => {
    const newTheme = require('./presentation/theme').default
    const newSlides = require('./presentation/index.mdx').default
    ReactDOM.render(
      <AppContainer errorReporter={CustomErrorReporter}>
        <ApolloProvider client={client}>
          <Deck
            transition={[creeperTransition]}
            transitionDuration={500}
            contentWidth={1500}
            theme={newTheme}>
            {newSlides.map((S, i) => {
              let transition = transitions[i] || null
              return <S transition={transition} key={`slide-${i}`} />
            })}
          </Deck>
        </ApolloProvider>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
