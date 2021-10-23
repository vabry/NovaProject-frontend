import GoogleLogin from 'react-google-login';
import axios from "axios";


const LoginGoogle = () => {
    const respGoogle = async (resp) => {
        console.log(resp);
        const newUser = {
            Nombre: resp.profileObj.name,
            Email: resp.profileObj.email
        }
        const datosUser = await axios.post("http://localhost:4000/api/usuarios", newUser);
        console.log(datosUser);
    }
    return <div className="col-md-6 offset-md-3">
        <div className="card">
            <div className="card-header">Inicio sesion</div>
            <GoogleLogin
                clientId="712374110124-vn4dcthl9qq1vq33m4mbee33raajmmvq.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={respGoogle}
                onFailure={respGoogle}
                cookiePolicy={'single_host_origin'} />
        </div>
    </div>
}
export default LoginGoogle;