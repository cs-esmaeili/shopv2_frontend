import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config.json";
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const permission = useSelector(state => state.profile.permissions);
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>
            <hr className="sidebar-divider my-0" />
            {permission.includes('dashboard_page') &&
                <li className="nav-item active">
                    <Link
                        className="nav-link"
                        to={config.web_url}
                    >
                        <span>داشبورد</span>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                    </Link>
                </li>
            }
            {permission.includes('siteindex_page') &&
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={config.web_url + "siteIndex_page"}
                    >
                        <span>صفحه اصلی سایت</span>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                    </Link>
                </li>
            }
            {(permission.includes('admins_page') || permission.includes('rolePermissions_page')) &&
                <li className="nav-item">
                    <div className="nav-link collapsed" data-toggle="collapse" data-target="#collapseAdmin"
                        aria-expanded="true" aria-controls="collapseAdmin" style={{ cursor: "pointer" }}>
                        <span>مدیریت</span>
                        <i className="fas fa-fw fa-cog"></i>
                    </div>
                    <div id="collapseAdmin" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">اجزا شخصی سازی شده</h6>
                            {permission.includes('admins_page') &&
                                <Link
                                    className="collapse-item"
                                    to={config.web_url + "admins"}
                                >
                                    حساب ها
                                 </Link>
                            }
                            {permission.includes('rolePermissions_page') &&
                                <Link
                                    className="collapse-item"
                                    to={config.web_url + "rolePermissions"}
                                >
                                    قوانین و نقش ها
                                 </Link>
                            }
                        </div>
                    </div>
                </li>
            }
            {permission.includes('fileManager_page') &&
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={config.web_url + "fileManager"}
                    >
                        <span>فایل ها</span>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                    </Link>
                </li>
            }
            {permission.includes('category_page') &&
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={config.web_url + "category"}
                    >
                        <span>دسته بندی</span>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                    </Link>
                </li>
            }
            {(permission.includes('createPost_page') || permission.includes('postList_page')) &&
                <li className="nav-item">
                    <div className="nav-link"
                        data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo" style={{ cursor: "pointer" }}>
                        <span>مطالب</span>
                        <i className="fas fa-fw fa-cog"></i>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            {permission.includes('createPost_page') &&
                                <Link
                                    className="collapse-item"
                                    to={config.web_url + "createPost"}
                                >
                                    مطلب جدید
                                </Link>
                            }
                            {permission.includes('postList_page') &&
                                <Link
                                    className="collapse-item"
                                    to={config.web_url + "postList"}
                                >
                                    لیست مطالب
                               </Link>
                            }
                        </div>
                    </div>
                </li>
            }
            {(permission.includes('createPost_page') || permission.includes('postList_page')) &&
                <li className="nav-item">
                    <div className="nav-link"
                        data-toggle="collapse" data-target="#collapseProduct"
                        aria-expanded="true" aria-controls="collapseProduct" style={{ cursor: "pointer" }}>
                        <span>کالا ها</span>
                        <i className="fas fa-fw fa-cog"></i>
                    </div>
                    <div id="collapseProduct" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            {permission.includes('createPost_page') &&
                                <Link
                                    className="collapse-item"
                                    to={config.web_url + "createProduct"}
                                >
                                    افزودن کالا
                                </Link>
                            }
                            {permission.includes('postList_page') &&
                                <Link
                                    className="collapse-item"
                                    to={config.web_url + "productList"}
                                >
                                    لیست کالا ها
                               </Link>
                            }
                        </div>
                    </div>
                </li>
            }
            <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => {
                    let sidebar = document.getElementById('accordionSidebar');
                    let body = document.getElementById('page-top');
                    if (sidebar.classList.contains('toggled')) {
                        sidebar.classList.remove("toggled");
                        body.classList.remove("toggled");
                    } else {
                        sidebar.classList.add("toggled");
                        body.classList.add("toggled");
                    }
                }}></button>
            </div>
        </ul>
    );
}
export default Sidebar;
