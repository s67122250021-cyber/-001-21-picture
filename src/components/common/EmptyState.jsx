import { Link } from "react-router-dom";
export default function EmptyState({title,message,action}){return <div className="empty-state"><h2>{title}</h2><p>{message}</p>{action&&<Link className="btn" to={action.to}>{action.label}</Link>}</div>}
