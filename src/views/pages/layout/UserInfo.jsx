import LocalStorageService from "../../../redux/actions/LocalStorageService";
import IconRenderer from "./../../../views/IconRenderer";

function UserInfo({ showTitle = false }) {
  if (!showTitle) return null;
  const user = LocalStorageService.getItem("auth_user")?.user;
  let username, role, email;
  if (user) {
    username = user?.name || "Administrator";
    role = user?.role;
    email = user?.email;
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  return (
    <div className="py-1 px-2 m-2 rounded backdrop-blur-sm bg-slate-500/30 text-slate-300 items-center">
      <div className="flex flex-col select-none">
        {username && <p className="text-[10px]">{username}</p>}
        {role && <IconLabel label={role} icon="AccountCircle" />}
      </div>
      {email && validateEmail(email) && <IconLabel label={email} icon="Email" />}
    </div>
  );
}

function IconLabel({ icon, label }) {
  return (
    <p className="text-[10px] flex items-center">
      <IconRenderer icon={icon} className="mr-[2px]" style={{ width: "12px" }} />
      {label}
    </p>
  );
}

export default UserInfo;
