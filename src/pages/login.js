import { useState} from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export default function Signin() {

    const[useremail, setUseremail] = useState('')
    const [userPassword, setUserpassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    
    const from = location.state?.from || '/'
    
    const login = ()=>{
      signInWithEmailAndPassword(auth, useremail, userPassword)
      .then(()=>{
        navigate(from, {replace: true})
      })
      .catch((error)=>{
        console.log(error.code)
      })
    }

    const back = ()=>{
      navigate(-1)
    }
    
    let disable= true
    if(userPassword && useremail !==""){
      disable= false
    }
    
   
    return (
      <>
        <h3 onClick={back} className='back'>Go back</h3>
        <div className="login-form">
          <div className="login-div">
            {
              location.state?.message && <h3 className="stateMessage">{location.state.message}</h3>
            }
            <h2 className="login-heading">
              Log in to your account
            </h2>
          </div>
  
          <div className="login-body">
            <div className="login-element" >
              <div>
                <label htmlFor="email" className="email-label">
                  Email address:
                </label>
                <div className="input-div">
                  <input
                    id="email"
                    name="email"
                    onChange={(e)=>setUseremail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="input-email"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="password-label">
                    Password:
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e)=>setUserpassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="input-password"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="Login-button"
                  onClick={login}
                  disabled={disable}
                  
                >
                  Log in
                </button>
              </div>
            </div>
  
            <p className="register-text">
              Not a member?{' '}
             <span className="span"> 
                <Link to="/signup">Register here</Link>
            </span>
            </p>
          </div>
        </div>
      </>
    )
  }
  