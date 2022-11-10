import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TareasService from '../servicios/TareasService';

const Formtareas = () => {

    const navTo = useNavigate();
    const { id } = useParams();

    const [state, setState] = useState({
        cargando : false,
        tarea : {
            titulo: '',
            descripcion : '',
            estado : ''
        },
        error : ''
    });

    useEffect(() => {
        try {
            setState({...state, cargando : true})
            const cargarTarea = async () => {
                const response = await TareasService.getTarea(id);
                console.log(response.data);
                setState({...state, cargando : false, tarea : response.data});
            }
            cargarTarea();
        } catch (err) {
            setState({...state, cargando : false, error : err.message});
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const guardarDatos = async (event) => {
        event.preventDefault();
        try {
            var response;
            if (id == null) {
                response = await TareasService.saveNewTarea(state.tarea);
            }
            else {
                response = await TareasService.updateTarea(state.tarea, id);
            }
            if (response) {
                toast.success('Guardado exitoso');
                navTo("/tareas");
            }
        } catch (err) {
            setState({...state, error : err.message});
        }
    }
    
    const datosCambiados = (event) => {
        setState({...state, cargando : false, tarea : {
            ...state.tarea,
            [event.target.name] : event.target.value
        }});
    }

    return (
        <div className='container'>
            <h2>Formulario tareas</h2>
            <form onSubmit={guardarDatos}>
                <div className="form-group row mb-3">
                    <div className="col-lg-3">
                        <label htmlFor="titulo" className="form-control-sm">Título:</label>
                        <input type="text" id="titulo" name="titulo" value={state.tarea.titulo} onChange={datosCambiados} className="form-control form-control-sm" maxLength="45" required/>
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="descripcion" className="form-control-sm">Descripción:</label>
                        <input type="text" id="descripcion" name="descripcion" value={state.tarea.descripcion} onChange={datosCambiados} className="form-control form-control-sm" maxLength="90" required/>
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="estado" className="form-control-sm">Estado</label>
                        <select id="estado" name="estado" value={state.tarea.estado} onChange={datosCambiados} className="form-select form-select-sm" required>
                            <option value="">Seleccione una opción</option>
                            <option value="En espera">En espera</option>
                            <option value="En proceso">En proceso</option>
                            <option value="Finalizada">Finalizada</option>
                        </select>
                    </div>
                </div>                    
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success me-2" type="submit" name="action" value="guardar">Guardar</button>
                    <a href="/tareas" className="btn btn-light" role="button">Cancelar</a>
                </div>
            </form>
        </div>
    );

}

export default Formtareas;