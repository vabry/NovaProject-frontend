import { useState, useEffect } from "react";
import axios from "axios";


const CreateUserFuncion = (props) => {

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState("")
    const [objeto, setObjeto] = useState({
        Nombre: "",
        Cargo: "",
        Email: "",
        Estado: "",
    })

    const onInputChange = (e) => {
        setObjeto({
            ...objeto,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if (!props.match) {
            return
        }

        async function obtenerDatos() {
            if (props.match.params.id) {
                const res = await axios.get("http://localhost:4000/api/usuarios/" + props.match.params.id);
                setObjeto(
                    {
                        Nombre: res.data.Nombre,
                        Email: res.data.Email,
                        Cargo: res.data.Cargo,
                        Estado: res.data.Estado
                    }
                )
                setEditing(true)
                setId(res.data._id)
            }
        }

        obtenerDatos()
    }, [props.match])

    const onSubmit = async (e) => {
        console.log("probando")
        e.preventDefault();
        if (editing) {
            const updateUser = {
                Nombre: objeto.Nombre,
                Email: objeto.Email,
                Cargo: objeto.Cargo,
                Estado: objeto.Estado,
            };

            try {
                const actualizar = await axios.put("http://localhost:4000/api/usuarios/" + id, updateUser);
                console.log(actualizar.data)
            } catch (e) { console.error(e) }
        }
        else {
            const newUser = {
                Nombre: objeto.Nombre,
                Email: objeto.Email,
                Cargo: objeto.Cargo,
                Estado: objeto.Estado,
            };
            try{
                const crear = await axios.post("http://localhost:4000/api/usuarios", newUser);
            console.log(crear.data)
            } catch (e) { console.error(e) }
        }
        window.location.href = '/usuario';
    }

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>▒ Nuevo Usuario ▒  </h4>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            onChange={onInputChange}
                            name="Nombre"
                            value={objeto.Nombre}
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="Email"
                            onChange={onInputChange}
                            value={objeto.Email}
                            required>
                        </input>
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            value={objeto.Cargo}
                            onChange={onInputChange}
                            name="Cargo"
                            required>
                            <option selected> Seleccione el tipo de usuario</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Vendedor">Vendedor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            value={objeto.Estado}
                            onChange={onInputChange}
                            name="Estado"
                            required>
                            <option selected> Seleccione el estado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Autorizado">Autorizado</option>
                            <option value="No autorizado">No autorizado</option>
                        </select>
                    </div>

                    <button className="btn btn-primary">
                        Guardar <i className="material-icons"> </i>
                    </button>

                </form>

            </div>
        </div>
    )

}
export default CreateUserFuncion;