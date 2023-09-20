import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { IAuthUser } from "../../../entities/Auth";

const AdminLayout = () => {

    const navigate = useNavigate();

    const { isAuth, user } = useSelector(
      (store: any) => store.auth as IAuthUser
    );

    let isAdmin = false;
    if (isAuth && user) {
      for (let i = 0; i < user?.roles.length; i++)
        if (user?.roles[i] === "admin") isAdmin = true;
    }
    useEffect(() => {
        if(!isAdmin)
            navigate("/login");
    }, []);

    return (
        <>
            <AdminHeader/>
            <div>
                {isAdmin && <Outlet />}
            </div>
        </>
    )
}

export default AdminLayout;