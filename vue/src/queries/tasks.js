import './provideApollo'
import gql from 'graphql-tag'

export const taskQuery = gql`query {
  tasks {
    id
    isDone
    name
    description
  }
}
`
export const createTask = gql`mutation createTask($name:String, $description: String) {
  createTask(name: $name, description: $description) {
    task {
      id
      isDone
      name
      description
    }
    ok
  }
}`

export const updateTask = gql`mutation updateTask($id: String, $IsDone: Boolean) {
  updateTask(id: $id, IsDone: $IsDone) {
    task {
      id
      isDone
      name
      description
    }
    ok
  }
}`
