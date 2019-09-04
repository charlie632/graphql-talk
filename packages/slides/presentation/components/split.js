import React from 'react'
import {Heading, Text, CodePane} from 'spectacle'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import preloader from 'spectacle/lib/utils/preloader'
import {queries} from './queries'

const SplitPane = ({queryNumber}) => {
  const [state, setState] = React.useState({
    loading: null,
    error: null,
    data: null,
  })
  const [shoot, setShoot] = React.useState(false)
  const {error, loading, data} = state
  const query = queries[queryNumber]
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <div style={{width: '40%'}}>
          query
          <CodePane lang="graphql" source={query} />
        </div>
        <div style={{width: '40%'}}>
          response
          <Response error={error} loading={loading} data={data} />
        </div>
      </div>
      <div style={{width: '100%'}}>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
          <button onClick={() => setShoot(true)}>🚀</button>
        </div>
      </div>
      {shoot && <LaunchQuery query={query} response={r => setState(r)} />}
    </div>
  )
}

const LaunchQuery = ({query, response}) => {
  const {loading, error, data} = useQuery(
    gql`
      ${query}
    `
  )

  React.useEffect(() => {
    response({loading, error, data})
  }, [loading, error, data])

  return <div></div>
}

const Response = ({loading, error, data}) => {
  let text = ''
  if (loading) {
    text = 'Loading...'
  } else if (error) {
    text = JSON.stringify(error, null, 2)
  } else if (data) {
    text = JSON.stringify(data, null, 2)
  } else {
    text = 'Launch query, plz'
  }
  return <CodePane style={{minHeight: '100px'}} lang="json" source={text} />
}

export default SplitPane
