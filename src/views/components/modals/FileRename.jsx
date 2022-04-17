import React, { useEffect, useState } from "react";
import Modal from "../HOC/Modal";
import { _renamePublicFileAndFolder } from '../../../services/FileManager';
import { toast } from 'react-toastify';

const FileRename = ({ path , old_name , reloadMethod }) => {

    const [name, setName] = useState(old_name);

    const RenameHandler = async () => {
        try {
            const data = {
                path,
                old_name: old_name,
                new_name: name,
            };
            console.log(data);
            const respons = await _renamePublicFileAndFolder(data);
            if (respons.data.statusText === "ok") {
                document.getElementById('Modal_FileRename_Close').click();
                reloadMethod();
            }
            toast(respons.data.message);
        } catch (error) { }
    }

    const footer = () => {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={RenameHandler} style={{ margin: "5px" }}>تغییر نام</button>
                <button id="Modal_FileRename_Close" type="button" className="btn btn-secondary" data-dismiss="modal">لغو</button>
            </div>
        );
    }

    useEffect(() => {
        setName(old_name);
    }, [old_name]);

    return (
        <Modal obj_id="Modal_FileRename" close={true} footer={footer()} title="تغییر نام">
            <div>
                <input className="form-control mb-2" name="path" value={name} onChange={(e) => {
                    setName(e.target.value);
                }} />
            </div>
        </Modal>

    );
};

export default FileRename;
