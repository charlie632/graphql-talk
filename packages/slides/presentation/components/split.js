import React from 'react'
import {CodePane} from 'spectacle'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import styled from 'styled-components'
import {colors} from '../theme'
import {queries, mutations} from './queries'

const Button = styled.button`
  border-radius: 5px;
  background-color: ${() => colors.primary};
  padding: 8px;
  cursor: pointer;
  border: 2px solid ${() => colors.secondary};
`

const SplitPane = ({query, mutation}) => {
  const [state, setState] = React.useState({
    loading: null,
    error: null,
    data: null,
  })
  const [shoot, setShoot] = React.useState(false)
  const {error, loading, data} = state
  const isQuery = !!query
  const src = query ? queries[query] : mutations[mutation]
  return (
    <div className="heheheh">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <div style={{width: '40%'}}>
          <p>query</p>
          <CodePane lang="graphql" source={src} theme="external" />
        </div>
        <div style={{width: '40%'}}>
          <p>response</p>
          <Response error={error} loading={loading} data={data} />
        </div>
      </div>
      <div style={{width: '100%'}}>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
          <Button onClick={() => setShoot(true)}>🚀 launch</Button>
        </div>
      </div>
      {isQuery && shoot && (
        <LaunchQuery query={src} response={r => setState(r)} />
      )}
      {!isQuery && shoot && (
        <LaunchMutation mutation={src} response={r => setState(r)} />
      )}
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

const LaunchMutation = ({mutation, response}) => {
  const [mut, {data, loading, error}] = useMutation(
    gql`
      ${mutation}
    `
  )

  React.useEffect(() => {
    response({data, loading, error})
  }, [data, loading, error])

  React.useEffect(() => {
    mut()
  }, [])

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
  return (
    <CodePane
      theme="external"
      style={{maxHeight: '500px', overflowY: 'auto'}}
      lang="json"
      source={text}
    />
  )
}

export default SplitPane
