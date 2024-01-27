import { useState} from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Signin() {

    const[useremail, setUseremail] = useState('')
    const [userPassword, setUserpassword] = useState('')
    const[errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)
    const[loggingIn, setLogginIn] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    
    const from = location.state?.from || '/'
    
    const login = ()=>{
      
      signInWithEmailAndPassword(auth, useremail, userPassword)
      .then(()=>{
        setLogginIn(true)
        setErrorMessage('')
      })

      .then(()=>{
        setTimeout(()=>{
          navigate(from, {replace: true})
        }, 2000)
      })
      
      
      .catch((error)=>{
        console.log(error.code)
        setErrorMessage('Invalid credentials')
      })
    }

    let disable= true
    if(userPassword && useremail !==""){
      disable= false
    }
    
    const showPassword = ()=>{
      setShow(prev=>!prev)
    }
   
    return (
      <div className="auth">
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
                <div className="password-div">
                  <input
                    id="password"
                    name="password"
                    type={show? 'text': 'password'}
                    onChange={(e)=>setUserpassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="input-password"
                  /> 
                  <span>  
                    { show? <FaRegEye className="eyeIcon" onClick={showPassword}/> : <FaRegEyeSlash className="eyeIcon" onClick={showPassword}/>}
                  </span>
                 
                </div>
              </div>
              <p className="error">{errorMessage}</p>
                <button
                  type="submit"
                  className="Login-button"
                  onClick={login}
                  disabled={disable}

                >
                 {loggingIn && <span className="spinner"></span> }Log in  
                </button>
              
            </div>
           
            <p className="register-text">
              Not a member?{' '}
             <span className="span"> 
                <Link to="/signup">Register here</Link>
            </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
  