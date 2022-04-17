import React, { useState, useEffect } from "react";
import { getCookie } from "../../global/cookie";
import Login from "./Login/Login";
import Logout from "../components/modals/Logout";
import ContentAndSidebar from "./partials/ContentAndSidebar";
import RelogIn from './../components/modals/RelogIn';
import { CheckToken } from "../../services/Authorization";



const Main = () => {

    const [check, setCheck] = useState('checking');
    const [update, setUpdate] = useState(false);

    const checkToken = async () => {
        try {
            const respons = await CheckToken();
            console.log(respons);
            if (respons.data.statusText === "ok") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {

        const checkConditions = async () => {
            if (getCookie('token') === null) {
                return false;
            } else if (getCookie('token') !== null) {
                const checktoken = await checkToken();
                if (checktoken === true) {
                    return true;
                }
            }
            return false;
        }

        checkConditions().then((reuslt) => {
            setCheck(reuslt);
        })

        return () => {
            setCheck('checking');
        };

    }, [update]);

    return (
        <>
            {(check === 'checking') &&
                <div className="container-fluid bg-gradient-primary" style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <div className="row">
                        <div className="spinner-border text-danger" style={{ width: "8rem", height: "8rem", display: "block" }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="row mt-2" style={{ fontSize: "2rem", color: "white" }}>Loading...</div>
                </div>
            }
            {(check === true) &&
                <div>
                    <div id="wrapper">
                        <RelogIn />
                        <ContentAndSidebar />
                        <Logout update={() => setUpdate(!update)} />
                    </div>
                </div>
            }
            {(check === false) &&
                <Login update={() => setUpdate(!update)} />
            }
        </>
    )
}

export default Main;
