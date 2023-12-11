import RegisterForm from "../organisms/RegisterForm";
import { AuthProvider } from "../Context/Context";


function Register() {

  return (
    <>
      <div>
        <AuthProvider>
          <RegisterForm/>
        </AuthProvider>
       
      </div>
    </>
  )
}

export default Register;