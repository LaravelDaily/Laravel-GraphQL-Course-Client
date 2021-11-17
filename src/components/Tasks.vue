<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
    </ul>
    <button @click="open_form = true">Add a task</button>

    <div v-show="open_form">
      <input type="text" v-model="title" />
      <button @click="save_task">Save</button>
    </div>
  </div>
</template>

<script>
import TASKS_QUERY from "@/graphql/Tasks.gql";
import CREATE_TASK_MUTATION from "@/graphql/CreateTask.gql";

export default {
  data() {
    return {
      tasks: null,
      title: '',
      open_form: false
    };
  },
  methods: {
    save_task() {
      this.$apollo.mutate({
        mutation: CREATE_TASK_MUTATION,
        variables: {
          title: this.title
        }
      }).then(() => {
        this.title = ''
        this.open_form = false
        this.$apollo.queries.tasks.refetch()
      })
    }
  },
  apollo: {
    tasks: TASKS_QUERY,
  },
};
</script>
