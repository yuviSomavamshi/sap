import LogoRenderer from "./LogoRenderer";
import CustomDialog from "../../utilities/CustomDialog";
import CloseButton from "../../utilities/CloseButton";
import JsonTable from "../../utilities/JsonTable";
import dayjs from "dayjs";

function AboutDialog({ showDialog, closeDialog, product, version }) {
  const { organization, copyrightYear, name } = product;
  const rows = [];
  if (version) {
    const now = new Date(Number(version.buildTimestamp));
    rows.push({
      name,
      version: version.version,
      buildNo: version.buildNumber,
      date: dayjs(now.getTime() + now.getTimezoneOffset() * 60000).format("YYYY-MM-DD hh:mm:ss")
    });
  }

  return (
    <CustomDialog open={showDialog} onClose={closeDialog}>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center justify-center">
          <label className="text-color-0700 group-hover:text-color-0300 font-medium text-lg tracking-wide px-4 select-none">{name}</label>
          <LogoRenderer className="h-32 w-32" />
        </div>
        <JsonTable
          rows={rows}
          columns={[
            { key: "name", label: "Name" },
            { key: "version", label: "Version" },
            { key: "buildNo", label: "Build No" },
            { key: "date", label: "Build Date" }
          ]}
        />

        <p className="w-full font-thin text-slate-500">
          &copy; Copyright {copyrightYear} {organization.name}
        </p>
        <p className="text-slate-400 text-[10px] break-all w-96">{organization.address}</p>
        <div className="flex w-full justify-end mt-2">
          <CloseButton onClose={closeDialog} />
        </div>
      </div>
    </CustomDialog>
  );
}

export default AboutDialog;
