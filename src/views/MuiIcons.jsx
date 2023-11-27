import * as MuiIcons from "@mui/icons-material";

export default function IconRenderer({ icon = "Info", className = "", ...props }) {
  const MyIcon = MuiIcons[icon];
  return <MyIcon {...props} className={`${className}`} />;
}
