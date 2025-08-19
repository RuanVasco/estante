import { useState } from 'react';
import styles from './Profile.module.css';
import Account from '../../Components/Account/Account';
import UserItems from '../../Components/UserItems/UserItems';
import Sidebar from '../../Components/Sidebar/Sidebar';

interface props {
    initialView?: "account" | "items";
}

const Profile = ({ initialView = "account" }: props) => {
    const [viewType, setViewType] = useState<"account" | "items">(initialView);

    const sidebarItems = [
        {
            key: "account",
            label: "Conta",
            active: viewType === "account",
            onClick: () => setViewType("account"),
        },
        {
            key: "items",
            label: "Livros anunciados",
            active: viewType === "items",
            onClick: () => setViewType("items"),
        },
    ];

    return (
        <div className={`container-fluid ${styles.profile}`}>
            <div className="row">
                <Sidebar
                    title="Menu"
                    col={3}
                    items={sidebarItems}
                />
                <div className="col">
                    {viewType === "account" && <Account />}
                    {viewType === "items" && <UserItems />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
