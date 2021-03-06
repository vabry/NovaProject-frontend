import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default class userList extends Component {

    state = {
        users: []
    }

    componentDidMount() {

        this.getUser();

    }

    async getUser() {
        const res = await axios.get("https://novaproject.herokuapp.com/api/usuarios")
        this.setState({ users: res.data })
    }



    deleteUser = async (userid) => {

        if (window.confirm("¿Esta seguro de eliminar el usuario?")) {
            await axios.delete("https://novaproject.herokuapp.com/api/usuarios/" + userid);
            this.getUser();
        }
        else { }
    }

    render() {
        return (
            <><Link className="btn btn-info" to={"/newUser"}>
                <p className="fw-bold">Crear usuario</p>
            </Link>
            
            <div className="row">
                    {this.state.users.map(user => (
                        <div className="col-md-4 p-2" key={user._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{user.Nombre}</h5>
                                    <Link className="btn btn-secondary" to={"/edit/" + user._id}>
                                        Editar
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>Correo: {user.Email}</p>
                                    <p>Tipo de Usuario: {user.Cargo}</p>
                                    <p>Estado: {user.Estado}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteUser(user._id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div></>
        )
    }
}