import { useEffect, useState } from "react";
import Modal from "../HOC/Modal";
import { _DeleteRole } from './../../../services/Person';
import { toast } from 'react-toastify';
import { remove } from "lodash";
import Table from './../Table';

const DeleteRole = ({ role_id, roles , update}) => {

    const [new_role_id, setNew_role_id] = useState(null);
    const [someRoles, setSomeRoles] = useState(false);

    const roleColumens = (row, generateID) => {
        return (
            <>
                <th key={generateID()} scope="col" className="text-center">{row.name}</th>
                <th key={generateID()} scope="col" className="text-center">{row.role_id}</th>
            </>
        );
    }

    const footer = () => {
        return (
            <>
                { someRoles === null || someRoles.length === 0 ? null :
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => deleteRole()} style={{ margin: "5px" }}>حذف نقش</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">لغو</button>
                    </div>
                }
            </>
        );
    }
    const deleteRole = async () => {
        if (new_role_id !== null) {
            try {
                const respons = await _DeleteRole({ role_id, new_role_id });
                if (respons.data.statusText === "ok") {
                    toast(respons.data.message);
                    update();
                }
            } catch (error) { }
        }
    }

    useEffect(() => {
        setSomeRoles(remove([...roles], (n) => {
            return n.role_id !== role_id;
        }));
    }, [role_id]);

    return (
        <Modal obj_id="Modal_DeleteRole" close={true} footer={footer()} title="حذف نقش">
            <span style={{ marginBottom: "10px", display: "block" }}>انتخاب نقش جایگزین برای کاربرانی که این نقش رو دارند</span>
            {(someRoles === null || someRoles.length === 0) && <div style={{ color: "red" }}>نقش دیگری وجود ندارد !</div>}
            {(someRoles != null) ?
                <Table titles={[
                    "id",
                    "نام",
                ]} data={someRoles} select={true} selectedValue={someRoles[0]} selectLisener={(selectedData) => {
                    if (selectedData != null) {
                        setNew_role_id(selectedData.role_id);
                    }
                }} columens={roleColumens} />

                : null}
        </Modal>

    );
};

export default DeleteRole;
