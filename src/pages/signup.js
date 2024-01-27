import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

export default function Signin() {

    const[userInfo, setUserInfo] = useState({
        email: '',
        password: '', 
        userName:''
    })

    const[errorMessage, setErrorMessage] = useState('')
    const[show, setShow] = useState('')
    const[loggingIn, setLogginIn] = useState(false)

    const navigate = useNavigate()

    
    const signUp =()=>{
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential)=>{
          updateProfile(auth.currentUser,{
            displayName: userInfo.userName
          })
          setLogginIn(true)
          
        })
        .then(()=>{
          setTimeout(()=>{
            navigate('/login')
          }, 2000)
          setErrorMessage('')
        })
        .catch((error)=>{
          if(error.code === "auth/weak-password"){
            setErrorMessage('password must not be lesser than 6 characters')
          }
          else if(error.code ==='auth/email-already-in-use'){
            setErrorMessage('This email is already used by another account')
          }
          else{
            setErrorMessage('invalid credentials')
          }
          console.log(error.code)
        })
       
    
    }

    let disable= true
    if(userInfo.email && userInfo.password && userInfo.userName !==""){
      disable= false
    }
    
    const showPassword = ()=>{
      setShow(prev=>!prev)
    }

    return (
      <div className="auth">
        <div className="login-form">
            <div className="login-div">
              <h2 className="login-heading">
                Register your account
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
                      onChange={(e)=>setUserInfo({...userInfo, email:e.target.value})}
                      type="email"
                      autoComplete="email"
                      required
                      className="input-email"
                    />
                  </div>
                </div>
              <div>
                  <div>
                        <label htmlFor="password" className="password-label">
                          Username:
                        </label>
                  </div>
                  <div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={(e)=>setUserInfo({...userInfo, userName:e.target.value})}
                        required
                        className="input-password"
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
                      placeholder="at least 6 characters"
                      id="password"
                      name="password"
                      type={show? 'text': 'password'}
                      onChange={(e)=>setUserInfo({...userInfo, password:e.target.value})}
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
                    onClick={signUp}
                    disabled={disable}
                  >
                   {loggingIn && <span className="spinner"></span> } Sign Up
                  </button>
              </div>
    
              <p className="register-text">
                Already have an account?{' '}
                <span className="span"> 
                    <Link to="/login">Log in</Link>
                </span>
              </p>
            </div>
        </div>
      </div>
    )
  }
  