import { PersonIcon } from "@radix-ui/react-icons"
import './styles.css'

interface UserBadgeProps {
    label: string;
}

const UserBadge = ({ label }: UserBadgeProps) => {
    return (
        <div className="userBadge">
            <PersonIcon className="userBadgeIcon"/>
            <div className="userBadgeLabel">{label}</div>
        </div>
    )
}

export default UserBadge