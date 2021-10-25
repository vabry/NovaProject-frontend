import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class SegVenta extends Component {
    
    state = {
        query: '',
        ventas: [],
        busqueda: []
    }  
    componentDidMount() {
        this.getVenta();
    }

    async getVenta() {
        const res = await axios.get("https://novaproject.herokuapp.com/api/ventas")
        this.setState({ ventas: res.data })
    }

    ventaDelete = async (ventaid) => {

        if (window.confirm("¿Esta seguro de eliminar el registro de la venta?")) {
            await axios.delete("https://novaproject.herokuapp.com/api/ventas/" + ventaid);
            this.getVenta();
        }
        else { }
    }
    reload = () => { 
        this.props.history.push(this.props.match.url)
        window.location.reload(true);
    }
    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
        this.filterArray();
    }
    filterArray = () => {
        var searchString = this.state.query;
        var responseVentas = this.state.ventas
        if(searchString.length > 0){
            responseVentas = 
            responseVentas.filter(L => {
                console.log()
                return L.prodVenta.toLowerCase().match(searchString)||
                L.cliente.toLowerCase().match(searchString)||
                L.vendedor.toLowerCase().match(searchString);
            })
            this.setState({ventas:responseVentas})
            
        }
    }
    render() {
        return (

            <div className="container container-sm">
                <br/>
        <div className="barraBusqueda"/>
            <input type="text" id= "filter" placeholder="Buscar" ref= {input => this.search = input} onChange= {this.handleInputChange} className="textField"/>
            <button onClick= {this.reload} type="button">Nueva busqueda</button>
        <div/>
        <br /><br />
                <table className="table  ">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">Id venta</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Valor total</th>
                            <th scope="col">Nombre cliente</th>
                            <th scope="col">Documento</th>
                            <th scope="col">Nombre vendedor</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>

                    {this.state.ventas.map(venta => (
                        <tbody key={venta._id}>
                            <tr className="table-primary">
                                <td>{venta._id}</td>
                                <td>{venta.fechaVenta}</td>
                                <td>{venta.prodVenta}</td>
                                <td>{venta.cantVenta}</td>
                                <td>{venta.precVenta}</td>
                                <td>{venta.totalVenta}</td>
                                <td>{venta.cliente}</td>
                                <td>{venta.documento}</td>
                                <td>{venta.vendedor}</td>


                                
                                <td>
                                <div className="row">
                                <div className="col-md-2 col-xs-6">
                                <button className="btn btn-danger btn-sm" onClick={() => this.ventaDelete(venta._id)}>
                                    Eliminar
                                </button>

                                <Link className="btn btn-secondary btn-sm" to={"/editv/" + venta._id}>
                                        Editar
                                </Link>
                                </div>
                                </div>
                                </td>
                                
                            </tr>
                        </tbody>
                    ))
                    }
                </table>

                <div className="card-header d-flex justify-content-between">


                    <Link className="btn btn-info btn-sm" to={"/ventas"} >
                        <p>Nueva venta</p>
                    </Link>
                </div>
            </div>
        )
    }
}