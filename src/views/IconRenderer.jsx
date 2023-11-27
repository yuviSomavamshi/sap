import React, { useEffect, useState } from "react";

const MuiIcons = (props) => {
  const [error, setError] = useState(null);
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(null);
    setLoading(true);
    import("./MuiIcons")
      .then((m) => {
        setLoading(false);
        setComponent(m);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, []);

  function resolve(obj) {
    return obj && obj.__esModule ? obj.default : obj;
  }

  function render(loaded, props) {
    const Component = resolve(loaded);
    return <Component {...props} />;
  }

  if (loading || error) {
    return <HourGlass className="opacity-50" />;
  } else if (component) {
    return render(component, props);
  } else {
    return null;
  }
};

export default function IconRenderer(props) {
  return <MuiIcons {...props} />;
}
const HourGlass = ({ className }) => {
  return (
    <svg width="16" height="16" className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 22L17.99 16L14 12L17.99 7.99L18 2H6V8L10 12L6 15.99V22H18ZM8 7.5V4H16V7.5L12 11.5L8 7.5Z" fill="#AEAEAE" />
    </svg>
  );
};
