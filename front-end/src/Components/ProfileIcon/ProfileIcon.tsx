import { FaUser } from "react-icons/fa6";
import style from "./ProfileIcon.module.css";

type Props = {
    onClick?: () => void;
};

const ProfileIcon = ({ onClick }: Props) => {
    return (
        <div className={style.avatarWrapper} onClick={onClick} role="button" tabIndex={0}>
            <FaUser className={style.userIcon} />
        </div >
    )
}

export default ProfileIcon;