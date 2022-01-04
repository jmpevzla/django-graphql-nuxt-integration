<template>
  <link href="static/tailwind.min.css" rel="stylesheet" /> 
  <h1 class="text-2xl font-bold">About Page</h1>
  <router-link class="text-blue-400" to="/">Go to Home</router-link>
  <div class="mt-3" v-if="list">
    <div v-for="i of list" :key="i.id">
      <ul>
        <li>
          <input type="checkbox" @input="doUpdateTask(i)" :checked="i.isDone">
          <strong>{{i.name}}</strong>:<span>{{i.description}}</span>
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
    <button class="mt-2 border-2 border-green-700 bg-green-400 px-3 py-1 rounded-md text-white" 
      @click="doCreateTask">Add</button>
</template>

<script setup>
import { reactive } from 'vue'
import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
//import gql from 'graphql-tag'
import { createTask, updateTask, taskQuery } from './queries/tasks.js'

//const list = ref(null)

const form = reactive({
  name: '',
  description: ''
})

const listTasks = () => {
  const { 
    // onResult 
    result, 
    //refetch
  } = useQuery(taskQuery)
  // onResult((result) => {
  //   list.value = result.data
  // })
  //return useResult(result, [])
  //refetch()
  return result
}

const doCreateTask = async () => {
  
  const { mutate } = useMutation(
    // Query
    createTask,
    {
      variables: {
        name: form.name,
        description: form.description
      },
      update: (store, 
          { data: { createTask } }
        ) => {
        // Add to All tasks list
        const data = store.readQuery({ query: taskQuery })
        // data.tasks.push(createTask)
        const newData = {
          ...data,
          tasks: [...data.tasks, createTask.task]
        }

        store.writeQuery({ query: taskQuery, data: newData })
      }
    }
  );
  const { data } = 
    await mutate()
  
  var t = data.createTask.task
  console.log('Added: ' , t)
  form.name = ''
  form.description = ''
}

const doUpdateTask = async (task) => {
  
  const { mutate } = useMutation(
    // Query
    updateTask,
    {
      variables: {
        id: task.id,
        IsDone: !task.isDone
      },
      // update: (store, 
      //     { data: { createTask } }
      //   ) => {
      //   // Add to All tasks list
      //   const data = store.readQuery({ query: taskQuery })
      //   // data.tasks.push(createTask)
      //   const newData = {
      //     ...data,
      //     tasks: [...data.tasks, createTask.task]
      //   }

      //   store.writeQuery({ query: taskQuery, data: newData })
      // }
    }
  );
  //const { data } = 
    await mutate()
  
}

const list = useResult(listTasks(), [])

</script>