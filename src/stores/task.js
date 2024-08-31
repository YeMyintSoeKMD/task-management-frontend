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
    if (!navigator.onLine) {
      alert("Cannot create while offline. Please try again when you are online.");
      return;
    }
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
    if (!navigator.onLine) {
      alert("Cannot update while offline. Please try again when you are online.");
      return;
    }
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
        if(res.status === 204){
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
    if (!navigator.onLine) {
      alert("Cannot search while offline. Please try again when you are online.");
      return;
    }
    await getTasks()
  }, 500)

  /**
   * Filtered by category
  */
  const filteredByCategory = async (e) => {
    if (!navigator.onLine) {
      alert("Cannot filter while offline. Please try again when you are online.");
      return;
    }
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
    if (!navigator.onLine) {
      alert("Cannot filter while offline. Please try again when you are online.");
      return;
    }
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
    if (!navigator.onLine) {
      alert("Cannot filter while offline. Please try again when you are online.");
      return;
    }
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
