import axios from "axios";

class TareasService {
    static URLService = "https://tareasmisiontic-api.herokuapp.com/api/tareas";

    static getTodasLasTareas() {
        return axios.get(this.URLService);
    }

    static getTareasFiltradas(query) {
        return axios.get(this.URLService+"?q="+query);
    }

    static getTarea(id) { 
        return axios.get(this.URLService+"/"+id);
    }

    static saveNewTarea(tarea) {
        return axios.post(this.URLService, tarea);
    }

    static updateTarea(tarea, id) {
        return axios.put(this.URLService+"/"+id, tarea);
    }

    static deleteTarea(id) {
        return axios.delete(this.URLService+"/"+id);
    }
}

export default TareasService