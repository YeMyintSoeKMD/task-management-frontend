import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import debounce from 'lodash.debounce'
import axiosInstance from '@/assets/axios-config'

export const useTaskStore = defineStore('task', () => {
  
  /* Reseting form */
  const resetForm = (form) => {
    Object.assign(form, {
      title: '',
      description: '',
      due_date: '',
      category_id: '',
      user_id: '',
    });
  };


  /* Get tasks */
  const q = ref('')
  const tasks = ref([])

  const getTasks = async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/tasks?q=${q.value}&page=${page}`);
      if(res.status === 200){
        tasks.value = res.data.data
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  /* Get a task */
  const task = ref({})
  const getTask = async (id) => {
    try {
      const res = await axiosInstance.get(`/tasks/${id}`);
      if(res.status === 200){
        task.value = res.data.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* Store task */
  const form = reactive({
    'title': '',
    'description': '',
    'due_date': '',
    'category_id': ''
  })
  const storeTask = async (authId) => {
    form.user_id = authId
    try {
      const res = await axiosInstance.post("/tasks", form);
      if(res.status === 201){
        getTasks()
        alert("Task created successfully")
        resetForm(form)
      }
    } catch (error) {
      console.error(error);
    }
  }


  /* Update task */
  const editId = ref(null)
  const editForm = reactive({
    'title': '',
    'description': '',
    'due_date': '',
    'category_id': ''
  })
  const updateTask = async () => {
    try {
      const res = await axiosInstance.put(`/tasks/${editId.value}`, editForm);
      if(res.status === 200){
        getTasks()
        alert("Task created successfully")
        resetForm(editForm)
        editId.value = null
      }
    } catch (error) {
      console.error(error);
    }
  }

  /* Delete task */
  const deleteTask = async (id) => {
    if (!navigator.onLine) {
      alert("Cannot delete task while offline. Please try again when you are online.");
      return;
    }
    try {
      if(confirm('Are you sure?')) {
        const res = await axiosInstance.delete(`/tasks/${id}`);
        if(res.status === 200){
          getTasks();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

    /**
   * Live filter - Search by title and description
  */
  const search = debounce( async () => {
    await getTasks()
  }, 500)

  /**
   * Filtered by category
  */
  const filteredByCategory = async (e) => {
    try {
      const page = 1
      const res = await axiosInstance.get(`/tasks?q=${q.value}&category_id=${e.target.value}&page=${page}`);
      if(res.status === 200){
        tasks.value = res.data.data
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Filtered by trashed or not
  */
  const filteredBySoftdelete = async (e) => {
    try {
      const trashed = e.target.value
      if(trashed === '') {
        getTasks()
        return 
      }
      const res = await axiosInstance.get(`tasks/softdelete/filter?trashed=${trashed}`);
      if(res.status === 200){
        tasks.value = res.data.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sort by asc or desc
  */
  const filteredByAscDesc = async (e) => {
    try {
      const sort = e.target.value
      if(sort === '') {
        getTasks()
        return 
      }
      const res = await axiosInstance.get(`tasks/asc-desc/sort?sort=${sort}`);
      if(res.status === 200){
        tasks.value = res.data.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { 
    getTasks,
    tasks,

    getTask,
    task,

    form,
    storeTask,

    editId,
    editForm,
    updateTask,

    deleteTask,

    q,
    search,
    filteredByCategory,
    filteredBySoftdelete,
    filteredByAscDesc
  }
})
