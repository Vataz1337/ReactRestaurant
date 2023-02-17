import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import "./register.css";
import axios from "../api/Axios";
import withAuth from "../hoc/withAuth";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,14}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,29}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const REGISTER_URL = '/users'

const Register = () => {
    const userRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    const [userFocus, setUserFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const useValidation = (value, regex) => {
        const [valid, setValid] = useState(false);

        useEffect(() => {
            setValid(regex.test(value));
        }, [value, regex]);

        return valid;
    };

    const validName = useValidation(user, USER_REGEX);
    const validEmail = useValidation(email, EMAIL_REGEX);
    const validPwd = useValidation(pwd, PWD_REGEX);

    const [validMatch, setValidMatch] = useState(false);

    useEffect(() => {
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, email, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameCheck = USER_REGEX.test(user);
        const pwdCheck = PWD_REGEX.test(pwd);
        if(!nameCheck || !pwdCheck){
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL,{
                user,
                pwd,
                email
            });
            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
        }catch(error){
            if(!error?.response){
                setErrMsg("No Server Response")
            } else if(error.response?.status === 409){
                setErrMsg("Email or username already taken")
            } else{
                setErrMsg("Something went wrong :/")
            }
        }
    }

    return (
        <>
            {success ? (
                <div>
                    <h1>Success!</h1>
                    <span className="Link">
                        <Link to="/Login">Sign In</Link>
                    </span>
                </div>
            ) : (
                <div className="register-form">
                    <div>
                        <p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
                    </div>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="name-form">
                            <label htmlFor="username">
                                <div>
                                    Name:
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                                </div>
                                <input ref={userRef}
                                       autoComplete="off"
                                       type="text"
                                       name="username"
                                       required value={user}
                                       onChange={(e) => setUser(e.target.value)}
                                       onFocus={() => setUserFocus(true)}
                                       onBlur={() => setUserFocus(false)}/>
                            </label>
                            <p id="userInstructions" className={userFocus && user && !validName ? "instructions" : "hide"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 15 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>
                        <div className="email-form">
                            <label htmlFor="email">
                                <div>
                                    Email:
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                </div>
                                <input autoComplete="off"
                                       type="text"
                                       name="email"
                                       required
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       onFocus={() => setEmailFocus(true)}
                                       onBlur={() => setEmailFocus(false)}/>
                            </label>
                            <p id="emailInstructions" className={emailFocus && email && !validEmail ? "instructions" : "hide"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Invalid address email.<br />
                            </p>
                        </div>
                        <div className="password-form">
                            <label htmlFor="password">
                                <div>
                                    Password:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                                </div>
                                <input type="password"
                                       name="password"
                                       required
                                       value={pwd}
                                       onChange={(e) => setPwd(e.target.value)}
                                       onFocus={() => setPwdFocus(true)}
                                       onBlur={() => setPwdFocus(false)}/>
                            </label>
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hide"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 30 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        </div>
                        <div className="repeat-password-form">
                            <label htmlFor="repeat-password">
                                <div>
                                    Confirm Password:
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && validPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !pwd ? "hide" : "invalid"} />
                                </div>
                                <input type="password"
                                       name="repeat-password"
                                       required value={matchPwd}
                                       onChange={(e) => setMatchPwd(e.target.value)}
                                       onFocus={() => setMatchFocus(true)}
                                       onBlur={() => setMatchFocus(false)}/>
                            </label>
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hide"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                        </div>
                        <div className="submitButton">
                            <button disabled={!validName || !validPwd || !validMatch}>Sign Up</button>
                        </div>
                    </form>
                    <div className="belowForm">
                        <div>
                            <div>
                                <p>
                                    Already registered?<br/>
                                </p>
                                <span className="Link">
                                    <Link to="/Login">Sign In</Link>
                                </span>
                            </div>
                            <div>
                                <p>
                                    Want to see what we offer?<br/>
                                </p>
                                <span className="Link">
                                    <Link to="/Order">Checkout Menu</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default withAuth(Register)