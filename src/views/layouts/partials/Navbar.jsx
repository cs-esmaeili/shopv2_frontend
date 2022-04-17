import React from "react";
import { useSelector } from 'react-redux';
import config from '../../../config.json'


const Navbar = () => {
    const profile = useSelector((state) => state.profile);
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-bell fa-fw"></i>

                        <span className="badge badge-danger badge-counter">3+</span>
                    </a>

                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">
                            مرکز اعلان ها
                    </h6>
                        <a className="dropdown-item d-flex align-items-center" href="#">

                            <div>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">گزارش ماهانه جدید آماده بارگیری است!</span>
                            </div>
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                    <i className="fas fa-file-alt text-white"></i>
                                </div>
                            </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div>
                                <div className="small text-gray-500">December 7, 2019</div>
                                <span className="font-weight-bold">گزارش ماهانه جدید آماده بارگیری است!</span>
                            </div>
                            <div className="mr-3">
                                <div className="icon-circle bg-success">
                                    <i className="fas fa-donate text-white"></i>
                                </div>
                            </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div>
                                <div className="small text-gray-500">December 2, 2019</div>
                                <span className="font-weight-bold">گزارش ماهانه جدید آماده بارگیری است!</span>
                            </div>
                            <div className="mr-3">
                                <div className="icon-circle bg-warning">
                                    <i className="fas fa-exclamation-triangle text-white"></i>
                                </div>
                            </div>
                        </a>
                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                </li>


                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw"></i>

                        <span className="badge badge-danger badge-counter">7</span>
                    </a>

                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            مرکز پیام ها
                    </h6>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="font-weight-bold">
                                <div className="text-truncate" style={{ direction: "rtl" }}>سلام! من تعجب می کنم که آیا می توانید به من در a کمک کنید
                                مشکلی که داشته ام</div>
                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="" alt="" />
                                <div className="status-indicator bg-success"></div>
                            </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div>
                                <div className="text-truncate" style={{ direction: "rtl" }}>سلام! من تعجب می کنم که آیا می توانید به من در a کمک کنید
                                مشکلی که داشته ام</div>
                                <div className="small text-gray-500">Jae Chun · 1d</div>
                            </div>
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="img/undraw_profile_2.svg" alt="" />
                                <div className="status-indicator"></div>
                            </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div>
                                <div className="text-truncate" style={{ direction: "rtl" }}>سلام! من تعجب می کنم که آیا می توانید به من در a کمک کنید
                                مشکلی که داشته ام</div>
                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="img/undraw_profile_3.svg" alt="" />
                                <div className="status-indicator bg-warning"></div>
                            </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div>
                                <div className="text-truncate" style={{ direction: "rtl" }}>سلام! من تعجب می کنم که آیا می توانید به من در a کمک کنید
                                مشکلی که داشته ام</div>
                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                            </div>
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src={config.logo_url}
                                    alt="" />
                                <div className="status-indicator bg-success"></div>
                            </div>
                        </a>
                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>


                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="img-profile rounded-circle" src={profile.information.image} />
                        <span className="ml-2 d-none d-lg-inline text-gray-600 small">{profile.information.name}</span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                            مشخصات
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        </a>
                        <a className="dropdown-item" href="#">
                            تنظیمات
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        </a>
                        <a className="dropdown-item" href="#">
                            فعالیت ها
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#Modal_Logout">
                            خروج
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        </a>
                    </div>
                </li>

            </ul>

            <form
                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                    <input type="text" className="form-control bg-light border-0 small" placeholder="...جستجو برای"
                        aria-label="Search" aria-describedby="basic-addon2" style={{ textAlign: "right" }} />

                </div>
            </form>


            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={() => {
                let sidebar = document.getElementById('accordionSidebar');
                let body = document.getElementById('page-top');
                if (sidebar.classList.contains('toggled')) {
                    sidebar.classList.remove("toggled");
                    body.classList.remove("toggled");
                } else {
                    sidebar.classList.add("toggled");
                    body.classList.add("toggled");
                }
            }}>
                <i className="fa fa-bars"></i>
            </button>

        </nav>
    );
}

export default Navbar;
