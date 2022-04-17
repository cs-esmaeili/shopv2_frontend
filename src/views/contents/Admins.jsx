import React, { useState, useEffect, useRef } from "react";
import { _Admins, _AdminRoles, _CreatePerson, _EditPerson } from "../../services/Person";
import Table from "../components/Table.jsx";
import useGenerator from "../../global/Idgenerator";
import { getValidator, rules } from '../../global/validator_rules';
import { toast } from 'react-toastify';
import { array_move } from '../../global/helpers';
import { useSelector } from 'react-redux';
import config from "../../config.json";

const Admins = () => {

    const [admins, setAdmins] = useState(null);
    const [adminRoles, setAdminRoles] = useState(null);
    const [role_id, setRole_id] = useState("");
    const [file_id, setFile_id] = useState("");
    const [username, setUsername] = useState("");
    const [oldUsername, setOldUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [family, setFamily] = useState("");
    const [description, setDescription] = useState("");
    const [person_id, setPerson_id] = useState("");
    const [generateID] = useGenerator();
    const [clearSelect, setclearSelect] = useState(generateID());
    const [forceUpdate, setForceUpdate] = useState(false);
    const [selecting, setSelecting] = useState(false);
    const validator = useRef(getValidator);
    const permission = useSelector(state => state.profile.permissions).includes('admins_page');

    const columens = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">{row.family}</th>
                <th key={generateID()} scope="col" className="text-center">{row.name}</th>
                <th key={generateID()} scope="col" className="text-center">{row.role}</th>
                <th key={generateID()} scope="col" className="text-center">{row.username}</th>
            </>
        );
    }
    const getAdmins = async () => {
        try {
            const respons = await _Admins();
            if (respons.data.statusText === "ok") {
                setAdmins(respons.data.list);
            }
        } catch (error) { }
    }
    const getAdminRoles = async () => {
        try {
            const respons = await _AdminRoles();
            if (respons.data.statusText === "ok") {
                setRole_id(respons.data.list[0].role_id)
                setAdminRoles(respons.data.list);
            }
        } catch (error) { }
    }

    const resetInputs = (data) => {
        validator.current.hideMessageFor();

        if (data === null) {
            setFile_id("");
            setUsername("");
            setPassword("");
            setName("");
            setFamily("");
            setRole_id("");
            setDescription("");
            setSelecting(false);
            setclearSelect(generateID());
        } else {
            setOldUsername(data.username);
            setSelecting(true);
            setFile_id(data.file_id);
            setPerson_id(data.person_id);
            setPassword("");
            setUsername(data.username);
            setName(data.name);
            setFamily(data.family);
            setRole_id(data.role_id);
            setDescription(data.description);
            let index = adminRoles.findIndex(x => x.role_id === data.role_id);
            let reOrder = array_move(adminRoles, index, 0);
            setAdminRoles(reOrder);
        }
        setForceUpdate(!forceUpdate);
    }
    const handelSubmit = async (event) => {

        event.preventDefault();
        let data = {
            username,
            name,
            family,
            oldUsername,
            description,
            file_id,
            person_id,
            role_id,
        };
        if (password !== null && password !== "") {
            data.password = password;
        }
        if (validator.current.allValid()) {
            try {
                console.log(data);
                if (selecting) {
                    const response = await _EditPerson(data);
                    if (response.data.statusText === "ok") {
                        resetInputs(null);
                        getAdmins();
                    }
                    toast(response.data.message);
                } else {
                    const response = await _CreatePerson(data);
                    if (response.data.statusText === "ok") {
                        resetInputs(null);
                        getAdmins();
                    }
                    toast(response.data.message);
                }
            } catch (error) {
                toast(error.response.data.message);
                console.log(error);
            }
        } else {
            validator.current.showMessages();
            setForceUpdate(!forceUpdate);
        }
    }

    useEffect(() => {
        getAdmins();
        getAdminRoles();
    }, []);

    if (permission === false) {
        return (
            <div class="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div>شما به این قسمت دسترسی ندارید</div>
            </div>
        );
    } else {
        return (
            <>
                <div className="container-fluid">
                    <form onSubmit={handelSubmit}>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                <div className="card shadow">
                                    <div className="card-header">
                                        <h6 className="font-weight-bold text-primary">تصویر حساب کاربری</h6>
                                    </div>
                                    <div className="card-body flex-column d-flex  align-items-center" >
                                        <input placeholder="ID عکس" name="file_id" id="file_id" className="form-control form-control-user" type="text" value={file_id} onChange={(e) => setFile_id(e.target.value)} />
                                        {
                                            validator.current.message(
                                                "file_id",
                                                file_id,
                                                "required"
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="card shadow">
                                    <div className="card-header">
                                        <h6 className="font-weight-bold text-primary">مشخصات حساب کاربری</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="flex-fill m-2">
                                                <div className="form-group">
                                                    <label htmlFor="password">رمز عبور</label>
                                                    <input placeholder="رمز عبور" name="password" id="password" className="form-control form-control-user" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    {
                                                        validator.current.message(
                                                            "password",
                                                            (selecting ? "tempstring" : password),
                                                            rules('password')
                                                        )
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="family">نام خانوادگی</label>
                                                    <input name="family" id="family" value={family} onChange={
                                                        (e) => {
                                                            setFamily(e.target.value);
                                                        }} className="form-control form-control-user" placeholder="نام خانوادگی" style={{ textAlign: "right" }} />
                                                    {validator.current.message(
                                                        "family",
                                                        family,
                                                        "required"
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-fill m-2" >
                                                <div className="form-group">
                                                    <label htmlFor="username">نام کاربری</label>
                                                    <input name="username" id="username" value={username} onChange={
                                                        (e) => {
                                                            setUsername(e.target.value);
                                                        }} className="form-control form-control-user" placeholder="نام کاربری" />
                                                    {validator.current.message(
                                                        "username",
                                                        username,
                                                        rules('username')
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">نام</label>
                                                    <input name="name" id="name" value={name} onChange={
                                                        (e) => {
                                                            setName(e.target.value);
                                                        }} className="form-control form-control-user" placeholder="نام" style={{ textAlign: "right" }} />
                                                    {validator.current.message(
                                                        "name",
                                                        name,
                                                        "required"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">توضیحات</label>
                                            <textarea name="description" id="description" value={description} onChange={
                                                (e) => {
                                                    setDescription(e.target.value);
                                                }} className="form-control form-control-user" style={{ textAlign: "right" }} >
                                            </textarea>
                                            {validator.current.message(
                                                "description",
                                                description,
                                                "required"
                                            )}
                                        </div>
                                        <div className="d-flex  mb-2 mx-2">
                                            <div className="input-group">
                                                <select className="custom-select" id="roleSelect" onChange={(e) => setRole_id(e.target.value)}>
                                                    {
                                                        (adminRoles != null) ?
                                                            adminRoles.map((row, index) =>
                                                                <option value={row.role_id} key={generateID()}>{row.name}</option>
                                                            )
                                                            : null
                                                    }
                                                </select>
                                                <div className="input-group-prepend" >
                                                    <label className="input-group-text" htmlFor="roleSelect">نقش</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2 mx-2">
                                            <div className="col-6">
                                                <button type="submit" className={(selecting) ? "btn btn-success btn-user w-100" : "btn btn-primary btn-user w-100"}>
                                                    {(selecting) ? "ذخیره تغییرات" : "ساخت حساب"}
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                {(selecting) ? <button onClick={() => {
                                                    setclearSelect(generateID());
                                                    resetInputs(null);
                                                }} className="btn btn-warning btn-user flex-fill  w-100" type="button">
                                                    لغو انتخاب
                                                  </button> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row mt-2">
                        <div className="col-12">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h6 className="font-weight-bold text-primary">تصویر حساب کاربری</h6>
                                </div>
                                <div className="card-body" >
                                    {(admins != null) ?
                                        <Table titles={[
                                            "نام خانوادگی",
                                            "نام",
                                            "نقش",
                                            "نام کاربری"
                                        ]} data={admins} select={true} clearSelect={clearSelect} selectLisener={(selectedData) => {
                                            if (selectedData != null) {
                                                resetInputs(selectedData);
                                            }
                                        }} columens={columens} />
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Admins;
