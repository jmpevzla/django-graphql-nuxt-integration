<template>
  <div class="p-8">
    <h1 class="font-bold text-2xl mb-8">Rick and Morty Characters</h1>
    <div class="grid grid-cols-3 gap-8" v-if="characters">
      <article
        v-for="character in characters.results"
        :key="character.id"
        class="flex flex-col items-start"
      >
        <h2 class="font-bold">{{ character.name }}</h2>
        <div class="text-sm text-gray-800">
          <p>Gender: {{ character.gender }}</p>
          <p>Location: {{ character.location.name }}</p>
        </div>
        <NuxtLink
          :to="`/character/${character.id}`"
          class="border rounded px-2 py-1 text-gray-800 border-gray-800 text-sm mt-2"
        >
          Read more
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

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

export default {
  apollo: {
    characters: {
      query: ALL_CHARACTERS_QUERY,
      prefetch: true
    },
  },
}
</script>
