import './styles.css'

interface BadgeProps {
    label: string;
    icon?: React.ReactNode;
}

const Badge = ({ label, icon }: BadgeProps) => (
    <div className="badge">
        <div className="badgeIconContainer">{icon}</div>
        <div className="badgeLabel">{label}</div>
    </div>
);

export default Badge