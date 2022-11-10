import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TareasService from '../servicios/TareasService';

const Listatareas = () => {

    const navTo = useNavigate()

    const [query, setQuery] = useState({
        text: ""
    })

    const [state, setState] = useState({
        cargando: false,
        tareas: [],
        idTareaBorrar:'',
        tituloTareaBorrar:'',
        error: ''
    })

    useEffect(() => {
        try {
            setState({ ...state, cargando: true })
            const cargarTareas = async () => {
                const response = await TareasService.getTodasLasTareas();
                console.log(response.data);
                setState({ ...state, cargando: false, tareas: response.data });
            };
            cargarTareas();
        } catch (err) {
            setState({ ...state, cargando: false, error: err.message });
        }
        // eslint-disable-next-line
    }, [])

    const selectTareaBorrar = (id, titulo) => {
        setState({ ...state, idTareaBorrar: id, tituloTareaBorrar : titulo })
    }

    const borrarTarea = async () => {
        try {
            if (state.idTareaBorrar != null) {
                const response = await TareasService.deleteTarea(state.idTareaBorrar);
                if (response) {
                    setState({ ...state, cargando: true })
                    const cargarTareas = async () => {
                        const response = await TareasService.getTodasLasTareas();
                        console.log(response.data);
                        setState({ ...state, cargando: false, tareas: response.data });
                    };
                    cargarTareas();
                    toast.success('Borrado exitoso');
                }
            }
        } catch (err) {
            setState({ ...state, error: err.message });
        }
    }

    const changeQuery = (event) => {
        setQuery({ ...query, text: event.target.value })
    }

    const buscarTarea = async (event) => {
        event.preventDefault();
        try {
            if (query.text != null) {
                setState({ ...state, cargando: true })
                const cargarTareas = async () => {
                    const response = await TareasService.getTareasFiltradas(query.text)
                    console.log(response.data);
                    setState({ ...state, cargando: false, tareas: response.data });
                };
                cargarTareas();
            }
            else {
                navTo("/tareas");
            }
        } catch (err) {
            setState({ ...state, error: err.message });
        }
    }

    return (
        <div className='container'>
            <h2 className='titulo'>Lista de tareas</h2>
            <form>
                <div className="row">
                    <div className="col-lg-4 d-flex">
                    <input className='form-control form-control-sm' type="text" id="criterio" name="criterio" placeHolder="Buscar" value={query.text} onChange={changeQuery} />
                    <button onClick={buscarTarea} className="btn btn-sm btn-primary ms-0"><i class="bi-search"></i></button>
                    </div>
                    <div className="col-lg-2">
                    <a href="/tareas/form" className="btn btn-sm btn-success" role="button"><i class="bi-plus-circle me-1"></i>Nueva tarea</a>
                    </div>
                </div>
            </form>
            <table className="table table-sm table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cargando ? (
                        <tr>
                            <td colSpan="5">
                                <div class="d-flex justify-content-center">
                                    <strong>Cargando... </strong>
                                    <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                </div>
                            </td>
                        </tr>
                    ) :
                        state.tareas.length > 0 ? state.tareas.map((tarea, index) => (
                            <tr key={index}>
                                <td>{tarea.titulo}</td>
                                <td>{tarea.descripcion}</td>
                                <td>{tarea.estado}</td>
                                <td>
                                    <a href={'/tareas/form/' + tarea._id} className="btn btn-sm btn-primary me-1">Editar</a>
                                    <button className="btn btn-sm btn-danger" onClick={() => selectTareaBorrar(tarea._id, tarea.titulo)} data-bs-toggle="modal" data-bs-target="#modalBorrar">Borrar</button>
                                </td>
                            </tr>

                        )) : (
                            <tr><td colSpan="5">No hay datos disponibles</td></tr>
                        )
                    }

                </tbody>
            </table>
            <div class="modal fade" id="modalBorrar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Alerta de eliminación</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">    
                            Desea borrar esta tarea: {state.tituloTareaBorrar}? 
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-danger" onClick={() => borrarTarea()} data-bs-dismiss="modal">Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listatareas;