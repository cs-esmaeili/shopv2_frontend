import { useState } from "react";
import Modal from "../HOC/Modal";
import { _AddRole } from './../../../services/Person';
import { toast } from 'react-toastify';

const AddRole = ({ update }) => {

    const [name, setName] = useState(null);
    const createRole = async (name) => {
        try {
            const respons = await _AddRole({ name });
            if (respons.data.statusText === "ok") {
                toast(respons.data.message);
                update();
            }
        } catch (error) { }
    };

    const footer = () => {
        return (
            <div style={{ textAlign: "center", width: "100%" }}>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => createRole(name)} style={{ margin: "5px" }}>ساخت نقش</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">لغو</button>
            </div>
        );
    }
    return (
        <Modal obj_id="Modal_AddRole" close={false} footer={footer()} title="ساخت نقش">
            <div className="row justify-content-center">
                <input onChange={(e) => setName(e.target.value)} />
            </div>
        </Modal>

    );
};

export default AddRole;
