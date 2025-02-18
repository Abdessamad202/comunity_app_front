import { UserPlus } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const Button = ({title,link,className}) => {
  return (
    <Link to={link} className={`flex px-6 py-3 ${className}  items-center gap-2 rounded-lg  transition duration-200 shadow-md`}>
        <UserPlus className="w-5 h-5" />
        {title}
    </Link>
  );
};
// proptype
Button.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
}

export default Button;
