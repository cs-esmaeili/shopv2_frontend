import React, { useEffect, useRef, useState } from "react";
import { getValidator, rules } from '../../../global/validator_rules';
import { LogInSchema } from '../../../global/validator_Schemas';
import { getCookie, setCookie } from '../../../global/cookie';
import config from "../../../config.json";
import { LogIn } from "../../../services/Authorization";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import './Login.css';
import axios from "axios";

const Login = ({ history, update = null, relogin = false }) => {
    const [show, setShow] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const validator = useRef(getValidator);
    const handelSubmit = async ({ username, password }) => {
        const obj = {
            username,
            password,
        };
        if (validator.current.allValid()) {
            try {
                const respons = await LogIn(obj);
                if (respons.data.statusText === "ok") {
                    const token = respons.data.token;
                    await setCookie(config.timeOut, 'token', token);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    if (relogin) {
                        document.getElementById('Modal_RelogIn_open').click();
                    } else {
                        history.replace(config.web_url);
                        update();
                    }

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
    useEffect(() => {
        if (relogin === false && getCookie('token') === null) {
            history.replace(config.web_url + "logIn");
        }
    }, []);
    return (
        <div className={(relogin === false) ? "container-fluid bg-gradient-primary" : ""} style={(relogin === false) ? { height: "100vh" } : { height: "100%" }}>
            <div className={(relogin === false) ? "row h-100 align-items-center justify-content-center" : ""}>
                <div className={(relogin) ? "col-12" : "col-xl-3 col-lg-4 col-md-4 col-sm-6"} >
                    <div className="card mb-4 py-3 border-bottom-danger">
                        <div className="card-body test">
                            <img className="img-fluid" src={config.logo_url} alt="cant load" style={{ borderRadius: "50%", padding: "inherit" }} />
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                }}
                                validationSchema={LogInSchema}
                                onSubmit={values => {
                                    handelSubmit(values);
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form onChange={() => { setShow(false) }}>
                                        <div className="form-group">
                                            <Field className="form-control form-control-user" name="username" placeholder="نام کاربری"
                                            />
                                            {errors.username && touched.username ? (
                                                <div>{errors.username}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <Field className="form-control form-control-user" name="password" placeholder="رمز عبور"
                                            />
                                            {errors.password && touched.password ? (
                                                <div>{errors.password}</div>
                                            ) : null}
                                        </div>
                                        {show &&
                                            <div className="alert alert-danger" role="alert" style={{ textAlign: "center" }}>
                                                نام کاربری یا رمز عبور اشتباه است
                                            </div>
                                        }
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            ورود
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
