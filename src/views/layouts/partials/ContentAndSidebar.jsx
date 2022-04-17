import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../../actions/profile";
import { _personProfile } from './../../../services/Person';
import ContentWrapper from '../partials/ContentWrapper';
import Sidebar from '../partials/Sidebar';
import config from "../../../config.json";

const ContentAndSidebar = () => {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const PersonProfile = async () => {
        if (show === false) {
            try {
                const respons = await _personProfile();
                if (respons.data.statusText === "ok") {
                    dispatch(setProfileData(respons.data));
                    setShow(true);
                }
            } catch (error) { }
        }
    }
    useEffect(() => {
        var timeout = setTimeout(() => {
            if (document.getElementById('Modal_RelogIn_open') != null && document.getElementById('Modal_RelogIn_open') !== undefined) {
                document.getElementById('Modal_RelogIn_open').click();
            }
        }, (config.timeOut * 60 * 1000));
        PersonProfile();
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    if (show) {
        return (
            <>
                <ContentWrapper />
                <Sidebar />
            </>
        );
    } else { return (<></>) }

}

export default ContentAndSidebar;
