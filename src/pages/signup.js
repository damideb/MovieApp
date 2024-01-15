import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase"

export default function Signin() {

    const[userInfo, setUserInfo] = useState({
        email: '',
        password: '', 
        userName:''
    })

    const navigate = useNavigate()

    
    const signUp =()=>{
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential)=>{
          console.log(userCredential)
          updateProfile(auth.currentUser,{
            displayName: userInfo.userName
          })
          
        })
        .then(()=>{
          setTimeout(()=>{
            alert('Account successfully registered')
            navigate('/login')
          }, 2000)
        })
        .catch((error)=>{
          console.log(error.code)
        })
    
    }

    const back = ()=>{
      navigate(-1)
    }

    return (
      <>
                <h3 onClick={back} className='back'>Go back</h3>
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
                <div className="mt-2">
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
                <div className="mt-2">
                  <input
                    placeholder="at least 6 characters"
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e)=>setUserInfo({...userInfo, password:e.target.value})}
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
                  onClick={signUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
  
            <p className="register-text">
              Already have an account?{' '}
             <span className="span"> 
                <Link to="/login">Log in</Link>
            </span>
            </p>
          </div>
        </div>
      </>
    )
  }
  