import { useState } from "react";
import { SubmitContext } from "../context/SubmitContext";
import PropTypes from "prop-types";

const SubmitProvider = ({ children }) => {
  const [submit, setSubmit] = useState(false);
  return <SubmitContext.Provider value={{ submit, setSubmit }}>{children}</SubmitContext.Provider>;
};
// ✅ Ensure `children` is a valid React node
SubmitProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SubmitProvider;