import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export default function Signin() {

    const[useremail, setUseremail] = useState('')
    const [userPassword, setUserpassword] = useState('')

    const navigate = useNavigate()

    const login = ()=>{
      signInWithEmailAndPassword(auth, useremail, userPassword)
      .then(()=>{
        navigate('/')
      })
      .catch((error)=>{
        console.log(error.code)
      })
    }
    return (
      <>
        <div className="login-form">
          <div className="login-div">
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
                >
                  Log in
                </button>
              </div>
            </div>
  
            <p className="register-text">
              Not a member?{' '}
             <span className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"> 
                <Link to="/signup">Register here</Link>
            </span>
            </p>
          </div>
        </div>
      </>
    )
  }
  