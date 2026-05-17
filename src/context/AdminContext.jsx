import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
    let [adminData, setAdminData] = useState("")
    let [dashboardData, setDashboardData] = useState(null)
    let [blockedUsers, setBlockedUsers] = useState([])
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
        } catch (error) {
            setDashboardData(null);
        }
    }

    const fetchBlockedUsers = async () => {
        try {
            const res = await axios.get(serverUrl + "/api/admin/blocked-users", { withCredentials: true });
            setBlockedUsers(res.data.blockedUser)
        } catch (error) {
            setBlockedUsers(null)
        }
    }

    let value = {
        serverUrl,
        adminData,
        setAdminData,
        getAdminData,
        dashboardData,
        setDashboardData,
        getDashboardState,
        fetchBlockedUsers, 
        blockedUsers
    }

    useEffect(() => {
        getAdminData();
    }, [])

    useEffect(() => {
        if (adminData) {
            getDashboardState();
            fetchBlockedUsers();

            const interval = setInterval(() => {
                getDashboardState();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [adminData]);

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default AdminContext
