import React from "react";
import Modal from './../HOC/Modal';

const RelogIn = () => {

    const footer = () => {
        return (
            <div style={{ textAlign: "center", width: "100%" }}>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">فهمیدم</button>
            </div>
        );
    }

    return (
        <Modal obj_id="Modal_PermissionDenid" close={false} footer={footer()} title="عدم دسترسی">
            <div>
                شما به این قسمت دسترسی ندارید
            </div>
        </Modal>
    );
}
export default RelogIn;
