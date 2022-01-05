<template>
  <div>
    <!-- Pre-rendered data -->
    <div class="p-4" v-if="tasks && tasks.length > 0">
      <div v-for="task of tasks" :key="task.id">
        <ul>
          <li>
            <input type="checkbox" @input="doUpdateTask(task)" :checked="task.isDone">
            <strong>{{task.name}}</strong>:<span>{{task.description}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-3 table mx-auto" style="border-spacing: 1rem 0.5rem;">
      <div class="table-row">
        <label class="table-cell text-right" for="name">Name:</label>
        <input id="name" type="text" class="table-cell border-2 border-gray-500 py-1 px-2 rounded-md"
          v-model="form.name">
      </div>
      <div class="table-row">
        <label class="table-cell text-right" for="description">Description:</label>
        <input id="description" type="text" class="table-cell border-2 border-gray-500 py-1 px-2 rounded-md"
          v-model="form.description">
      </div>
    </div>

    <button class="mt-2 border-2 border-green-700 bg-green-400 px-3 py-1 rounded-md text-white block mx-auto"
      @click="doCreateTask">Add</button>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
//import Component from '~/plugins/nuxt-class-component';
import gql from 'graphql-tag'
import { Watch, Component  } from 'vue-property-decorator'
import { Context, NuxtAppOptions } from '@nuxt/types';
import type { DollarApollo } from 'vue-apollo/types/vue-apollo'

const ALL_CHARACTERS_QUERY = gql`
  query ALL_CHARACTERS_QUERY {
    characters {
      results {
        id
        name
        gender
        location {
          name
        }
      }
    }
  }
`;

type Nullable<T> = T | null;

interface TC {
  name: string
  gender: string
  id: number
  location: {
    name: string
  }
}

interface TR {
  results: TC[]
}

interface ThisContext extends Context {
  $apolloHelpers: any
}

interface Task {
  id: number,
  isDone: boolean,
  name: string,
  description: string
}

interface FormTask {
  name: string,
  description: string
}

const TASKS_QUERY = gql`
  query {
    tasks {
      id
      isDone
      name
      description
    }
  }
`
const CREATE_TASK = gql`mutation createTask($name:String, $description: String) {
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

const UPDATE_TASK = gql`mutation updateTask($id: String, $IsDone: Boolean) {
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

@Component({})
export default class IndexPage extends Vue {
  // head = {
  //   title: 'R&M with Apollo'
  // }

  head() {
    return {
      title: 'Tasks with Apollo!',
    }
  }

  tasks: Nullable<Task[]> = []
  form: FormTask = {
    name: '',
    description: ''
  }
  $apollo!: DollarApollo<this>

  get apollo () {
    return {
      tasks: {
        query: TASKS_QUERY,
        prefetch: true
      }
    }
  }

  async asyncData(app: ThisContext) {
    console.log('Hello SERVER!')
  }

  mounted(this: IndexPage) {
    //console.log('hello', this.tasks?.results)
  }

  @Watch('tasks')
  onPropertyChanged(value: Task[], oldValue: Task[]) {
    console.log(value)
  }

  async doCreateTask() {
    const { data } = await this.$apollo.mutate<any, FormTask>({
      mutation: CREATE_TASK,
      variables: {
        name: this.form.name,
        description: this.form.description
      },
      update: (store, { data: { createTask } }) => {
          const data = store.readQuery<{tasks: Task[]}>({ query: TASKS_QUERY })
          data?.tasks.push(createTask.task)
          store.writeQuery({ query: TASKS_QUERY, data })
      }
    })
    const task = data.createTask.task
    console.log('Added: ', task)
    this.form.name = ''
    this.form.description = ''
  }

  async doUpdateTask(task) {
    const { data } = await this.$apollo.mutate({
      mutation: UPDATE_TASK,
      variables: {
        id: task.id,
        IsDone: !task.isDone
      }
    })
  }

}

//// export default Vue.extend({
// export default {
//   name: 'IndexPage',
//   apollo: {
//     characters: {
//       query: ALL_CHARACTERS_QUERY,
//       prefetch: true,
//     },
//   }
// ////})
// }
</script>
