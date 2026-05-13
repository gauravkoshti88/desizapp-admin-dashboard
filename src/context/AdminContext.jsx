import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
    let [adminData, setAdminData] = useState("")
    let [dashboardData, setDashboardData] = useState(null)
    let { serverUrl } = useContext(AuthContext);

    const getAdminData = async () => {
        try {
            let response = await axios.get(serverUrl + "/api/admin/getAdmin", { withCredentials: true });
            setAdminData(response.data);
        } catch (error) {
            setAdminData(null)
        }
    }

    const getDashboardState = async () => {
        try {
            let response = await axios.get(serverUrl + "/api/admin/getDashboardState", { withCredentials: true });
            setDashboardData(response.data);
            console.log(response.data);
        } catch (error) {
            setDashboardData(null);
        }
    }

    let value = {
        serverUrl,
        adminData,
        setAdminData,
        getAdminData,
        dashboardData,
        setDashboardData,
        getDashboardState
    }

    useEffect(() => {
        getAdminData();
        getDashboardState();
    }, [])

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default AdminContext
