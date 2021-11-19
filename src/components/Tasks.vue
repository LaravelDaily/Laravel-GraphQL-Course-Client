<template>
  <div>
    <div v-show="open_edit_form">
      <input type="text" v-model="title_edit" />
      <button @click="save_edit_task">Save</button>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="edit_task(task.id, task.title)">Edit</button>
        <button @click="delete_task(task.id)">Delete</button>
      </li>
    </ul>

    <div v-if="paginator">
      <div>Page: {{ paginator.currentPage }} / {{ paginator.lastPage }}</div>
      <div>
        Displaying {{ paginator.count }} entries out of {{ paginator.total }}
      </div>
      <div>
        <button @click="page--">
          &larr; Previous
        </button>
        <button @click="page++">
          Next &rarr;
        </button>
      </div>
    </div>

    <button @click="open_form = true">Add a task</button>

    <div v-show="open_form">
      <input type="text" v-model="title" />
      <button @click="save_task">Save</button>
    </div>
    <div v-show="errors" style="color: red">
      {{ errors }}
    </div>
  </div>
</template>

<script>
import TASKS_QUERY from "@/graphql/Tasks.gql";
import CREATE_TASK_MUTATION from "@/graphql/CreateTask.gql";
import DELETE_TASK_MUTATION from "@/graphql/DeleteTask.gql";
import UPDATE_TASK_MUTATION from "@/graphql/UpdateTask.gql";

export default {
  data() {
    return {
      tasks: null,
      title: '',
      title_edit: '',
      id_edit: null,
      open_form: false,
      open_edit_form: false,
      page: 1,
      perPage: 10,
      paginator: null,
      errors: ''
    };
  },
  methods: {
    save_task() {
      this.errors = ''
      this.$apollo.mutate({
        mutation: CREATE_TASK_MUTATION,
        variables: {
          title: this.title
        }
      }).then(() => {
        this.title = ''
        this.open_form = false
        this.$apollo.queries.tasks.refetch()
      }).catch((error) => {
        error.graphQLErrors.forEach(({extensions}) => {
          if (extensions.category === 'validation') {
            this.errors = extensions.validation.title[0];
          }
        });
      });
    },
    delete_task(id) {
      this.$apollo.mutate({
        mutation: DELETE_TASK_MUTATION,
        variables: {
          id: id
        }
      }).then(() => {
        this.$apollo.queries.tasks.refetch()
      })
    },
    edit_task(id, title) {
      this.open_edit_form = true
      this.id_edit = id
      this.title_edit = title
    },
    save_edit_task() {
      this.$apollo.mutate({
        mutation: UPDATE_TASK_MUTATION,
        variables: {
          id: this.id_edit,
          title: this.title_edit
        }
      }).then(() => {
        this.id_edit = null
        this.title_edit = ''
        this.open_edit_form = false
        this.$apollo.queries.tasks.refetch()
      })
    },
  },
  apollo: {
    tasks: {
      query: TASKS_QUERY,
      variables() {
        return {
          perPage: this.perPage,
          page: this.page
        }
      },
      update: function(data) {
        this.paginator = data.tasks.paginatorInfo

        return data.tasks.data
      }
    },
  },
};
</script>
