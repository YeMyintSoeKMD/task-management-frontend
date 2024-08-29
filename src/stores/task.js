import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/assets/axios-config'

export const useTaskStore = defineStore('task', () => {
  
  /* Get tasks */
  const tasks = ref([])
  const getTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
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
      console.log(error.response.data);
    }
  }

  /* Store task */
  const form = reactive({
    'title': '',
    'description': '',
    'due_date': '',
    'category_id': '',
    'user_id': '',
  })

  const storeTask = async (form) => {
    try {
      const data = {
        "title": form.title,
        "description": form.description,
        "due_date": form.due_date,
        "category_id": form.category_id,
        "user_id": 1,
      }
      const res = await axiosInstance.post("/tasks", data);
      if(res.status === 201){
        getTasks()
        alert("Task created successfully")
        form.title = ""
        form.description = ""
        form.due_date = ""
        form.category_id = ""
        form.user_id = ""
      }
    } catch (error) {
      console.error(error);
    }
  }

  /* Update task */

  /* Delete task */
  const deleteTask = async (id) => {
    
    if (!navigator.onLine) {
      alert("Cannot delete task while offline. Please try again when you are online.");
      return;
    }

    try {
      const res = await axiosInstance.delete(`/tasks/${id}`);
      if(res.status === 200){
        getTasks();
        alert("Task deleted successfully")
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return { 
    getTasks,
    tasks,

    getTask,
    task,

    form,
    storeTask,

    deleteTask
  }
})
