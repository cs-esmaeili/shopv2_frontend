import React, { useEffect, useRef, useState } from "react";
import { getValidator, rules } from '../../../global/validator_rules';
import { getCookie, setCookie } from '../../../global/cookie';
import config from "../../../config.json";
import { LogIn } from "../../../services/Authorization";
import { useDispatch } from "react-redux";
import { setToken } from "../../../actions/profile";
import { withRouter } from "react-router-dom";
import './Login.css';

const ReLogIn = ({ history }) => {
    const [username, Setusername] = useState("");
    const [password, Setpassword] = useState("");
    const [show, setShow] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const validator = useRef(getValidator);
    const dispatch = useDispatch();
    const handelSubmit = async (event) => {
        event.preventDefault();
        const obj = {
            username,
            password,
        };
        if (validator.current.allValid()) {
            try {
                const respons = await LogIn(obj);
                if (respons.data.statusText === "ok") {
                    const time = 1;
                    setCookie(time, 'token', respons.data.token);
                    await dispatch(setToken(respons.data.token));
                    setTimeout(() => {
                        document.getElementById('Modal_RelogIn_open').click();
                    }, (time * 60 * 1000));
                    document.getElementById('Modal_RelogIn_open').click();
                } else {
                    setShow(true);
                }
            } catch (error) {
            }
        } else {
            validator.current.showMessages();
            setForceUpdate(!forceUpdate);
        }
    };

    return (
        <div style={{ height: "100%" }}>
            <div className="col-12" >
                <div className="card mb-4 py-3 border-bottom-danger">
                    <div className="card-body test">
                        <img className="img-fluid" src={config.logo_url} alt="cant load" style={{ borderRadius: "50%", padding: "inherit" }} />
                        <form className="user" onSubmit={handelSubmit} >
                            <div className="form-group">
                                <input className="form-control form-control-user" placeholder="نام کاربری"
                                    value={username}
                                    onChange={(e) => {
                                        Setusername(e.target.value);
                                        setShow(false);
                                        validator.current.showMessageFor(
                                            "username"
                                        );
                                    }}
                                />
                                {validator.current.message(
                                    "username",
                                    username,
                                    rules('username')
                                )}
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-user" id="exampleInputPassword"
                                    placeholder="رمز عبور"
                                    value={password}
                                    onChange={(e) => {
                                        Setpassword(e.target.value);
                                        setShow(false);
                                        validator.current.showMessageFor(
                                            "password"
                                        );
                                    }}
                                />
                                {validator.current.message(
                                    "password",
                                    password,
                                    rules('password')
                                )}
                            </div>
                            {show &&
                                <div className="alert alert-danger" role="alert" style={{ textAlign: "center" }}>
                                    نام کاربری یا رمز عبور اشتباه است
                                </div>
                            }
                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                ورود
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(ReLogIn);
