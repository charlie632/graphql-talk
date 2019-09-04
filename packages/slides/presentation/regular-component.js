import React from 'react'
import {Heading, Text, CodePane} from 'spectacle'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import preloader from 'spectacle/lib/utils/preloader'

require('prismjs/components/prism-graphql')

const code = `
  query {
    hello
  }
`

const Yeah = () => {
  const {loading, error, data} = useQuery(gql`
    {
      hello
    }
  `)

  return <div>{JSON.stringify(data, null, 2)}</div>
}

const Code = ({code}) => (
  <CodePane theme="external" lang="graphql" source={code} />
)

export default class RegularComponent extends React.Component {
  state = {
    count: 0,
  }

  incrementCount = () => {
    this.setState(state => ({
      count: state.count + 1,
    }))
  }

  render() {
    return (
      <div>
        <CodePane
          lang="js"
          theme="external"
          source={require('raw-loader!../assets/deck.example')}
        />
        <Yeah />
      </div>
    )
  }
}
