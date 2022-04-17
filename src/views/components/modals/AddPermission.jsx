import { useEffect, useState } from "react";
import Modal from "../HOC/Modal";
import { _AddPermission, _MissingPermissions } from './../../../services/Person';
import Table from './../Table';
import { toast } from 'react-toastify';
import useGenerator from "../../../global/Idgenerator";

const AddPermission = ({ selectedRole, update }) => {
    const [generateID] = useGenerator();
    const [permissions, setPermissions] = useState(null);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [clear, setClear] = useState(generateID());

    const footer = () => {
        return (
            <div style={{ textAlign: "center", width: "100%" }}>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => addPermission(selectedPermission)} style={{ margin: "5px" }}>افزودن دسترسی</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">لغو</button>
            </div>
        );
    }
    const addPermission = async (permission_id) => {
        try {
            const respons = await _AddPermission({ 'role_id': selectedRole, permission_id });
            if (respons.data.statusText === "ok") {
                getMissingPermissions(selectedRole);
                setSelectedPermission(null);
                setClear(generateID());
                update();//TODO update injast
                toast(respons.data.message);
            }
        } catch (error) { }
    };


    const getMissingPermissions = async (role_id) => {
        try {
            const respons = await _MissingPermissions({ role_id });
            if (respons.data.statusText === "ok") {
                setPermissions(respons.data.list);
            }
        } catch (error) { }
    }
    const columens = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">{row.permission_id}</th>
                <th key={generateID()} scope="col" className="text-center">{row.name}</th>
            </>
        );
    }

    useEffect(() => {
        setPermissions(null);
        getMissingPermissions(selectedRole);
        setClear(generateID());
    }, [selectedRole , update]);//TODO ta update to azafe kardam  harvaght update seda bezanam update mishe !

    return (
        <>
            <Modal obj_id="Modal_AddPermission" close={false} footer={footer()} title="افزودن دسترسی">

                {(permissions != null) ?
                    <Table titles={[
                        "id",
                        "نام",
                    ]} data={permissions} select={true} clearSelect={clear} selectLisener={(selectedData) => {
                        if (selectedData != null) {
                            setSelectedPermission(selectedData.permission_id);
                        }
                    }} columens={columens} />
                    : null}
            </Modal>
        </>

    );
};

export default AddPermission;
