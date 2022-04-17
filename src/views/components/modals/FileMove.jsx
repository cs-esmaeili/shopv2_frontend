import React, { useEffect, useState } from "react";
import Modal from "../HOC/Modal";
import { _movePublicFileAndFolder } from './../../../services/FileManager';
import { toast } from 'react-toastify';

const FileMove = ({ items, old_path, reloadMethod }) => {

    const [oPath, setOpath] = useState(old_path);
    const [nPath, setNpath] = useState(old_path);


    const MoveHandler = async (path) => {
        try {
            const data = {
                old_path: oPath,
                new_path: nPath,
                items,
            };
            const respons = await _movePublicFileAndFolder(data);
            if (respons.data.statusText === "ok") {
                document.getElementById('Modal_FileMove_Close').click();
                reloadMethod();
            }
            toast(respons.data.message);
        } catch (error) { }
    }

    const footer = () => {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={MoveHandler} style={{ margin: "5px" }}>انتقال</button>
                <button id="Modal_FileMove_Close" type="button" className="btn btn-secondary" data-dismiss="modal">لغو</button>
            </div>
        );
    }

    useEffect(() => {
        setOpath(old_path);
        setNpath(old_path);
    }, [items, old_path]);

    return (
        <Modal obj_id="Modal_FileMove" close={true} footer={footer()} title="انتقال فایل">
            <div>
                <input className="form-control mb-2" name="path" value={nPath} onChange={(e) => {
                    setNpath(e.target.value);
                }} />
            </div>
        </Modal>

    );
};

export default FileMove;
