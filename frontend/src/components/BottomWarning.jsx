import { Link } from "react-router-dom";

export const BottomWarning = ({label,buttontext,to}) => {
    return<div className="flex justify-center py-2 text-sm">
        <div>
            {label}
        </div>

        <Link to={to} className="pointer cursor-pointer underline pl-1">
            {buttontext}
        </Link>
    </div>
};