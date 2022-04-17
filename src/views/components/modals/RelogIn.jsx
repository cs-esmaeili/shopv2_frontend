import React from "react";
import Modal from './../HOC/Modal';
import Login from '../../layouts/Login/Login';

const RelogIn = () => {
    return (
        <Modal obj_id="Modal_RelogIn" close={false} footer={null} title="جلسه فعلی منقضی شده است دوباره وارد شوید">
            <Login relogin={true} />
        </Modal>
    );
}
export default RelogIn;
