import React, { useEffect, useState, useRef } from "react";
import { PageHeader, Page, PageBody, PageTitle } from "./common/PageLayoutComponents";
import axios from "axios";
import qs from "qs";
import { useDispatch } from "react-redux";
import { showMessage } from "../../redux/actions/MessageAction";
import IconRenderer from "../IconRenderer";
import IconButton from "../utilities/IconButton";
import isEmpty from "lodash/isEmpty";
import EmptyIconRenderer from "../utilities/EmptyIconRenderer";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

function SecurityAuditManagement() {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({ assementType: 1 });

  const onSave = () => {
    dispatch(showMessage("success", "Request Processing"));
    setTimeout(() => {
      dispatch(showMessage("success", "Request Processed"));
    }, 10000);
    const jobParametersObject = {};
    // console.log(payload);
    if (payload["image_registry"]) {
      jobParametersObject["image_scan"] = "true";
      jobParametersObject["image_registry"] = payload["image_registry"];
      jobParametersObject["image_repository"] = payload["image_repository"];
      jobParametersObject["image_tag"] = payload["image_tag"];
    }
    if (payload["host_ip"]) {
      jobParametersObject["host_scan"] = "true";
      jobParametersObject["host_ip"] = payload["host_ip"];
      jobParametersObject["host_port"] = payload["host_port"];
      jobParametersObject["host_username"] = payload["host_username"];
      jobParametersObject["host_password"] = payload["host_password"];
    }
    if (payload["sca_git_repo"]) {
      jobParametersObject["sca_scan"] = "true";
      jobParametersObject["sca_git_repo"] = payload["sca_git_repo"];
    }
    if (payload["secrets_ip"]) {
      jobParametersObject["secrets_scan"] = "true";
      jobParametersObject["secrets_ip"] = payload["secrets_ip"];
      jobParametersObject["secrets_port"] = payload["secrets_port"];
      jobParametersObject["secrets_username"] = payload["secrets_username"];
      jobParametersObject["secrets_password"] = payload["secrets_password"];
      jobParametersObject["secrets_file_path"] = payload["secrets_file_path"];
    }
    if (payload["sast_git_repo"]) {
      jobParametersObject["sast_scan"] = "true";
      jobParametersObject["sast_git_repo"] = payload["sast_git_repo"];
    }
    if (payload["cis_ip"]) {
      jobParametersObject["cis_scan"] = "true";
      jobParametersObject["cis_ip"] = payload["cis_ip"];
      jobParametersObject["cis_port"] = payload["cis_port"];
      jobParametersObject["cis_username"] = payload["cis_username"];
      jobParametersObject["cis_password"] = payload["cis_password"];
    }
    if (payload["robin_cluster"]) {
      jobParametersObject["oran_testcases"] = "true";
      jobParametersObject["robin_ip"] = payload["robin_ip"];
      jobParametersObject["robin_port"] = payload["robin_port"];
      jobParametersObject["robin_username"] = payload["robin_username"];
      jobParametersObject["robin_password"] = payload["robin_password"];
      jobParametersObject["oran_capability"] = payload["oran_capability"];
    }

    const jenkinsUrl = "http://[240b:c0e3:4101:53eb:2001::31]:8080/job/SAP_Execution/buildWithParameters?token=sap_scan_tool";
    // notice the url has buildWithParameters instead of build
    const userName = "sapadmin";
    const password = "11a2326394f376e365ef977c39cf52888c";
    var basicAuth = "Basic " + btoa(userName + ":" + password);

    var data = qs.stringify(jobParametersObject);

    var config = {
      method: "POST",
      url: jenkinsUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: basicAuth,
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Expose-Headers": "Content-Length",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Max-Age": 3600
      },
      data: data
    };
    // console.log(config);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setPayload({
          image_scan_registry: "",
          host_scan_registry: "",
          sca_scan_registry: "",
          secrets_scan_registry: "",
          sast_scan_registry: "",
          cis_benchmark_registry: "",
          ip_address: ""
        });
        alert("Thank You for Submission. Execution is Starting..!!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [type, setType] = useState(0);
  const [product, setProduct] = useState(0);
  const prevType = usePrevious(type);

  useEffect(() => {
    if (type != prevType) {
      setProduct(0);
    }
  }, [type]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Security Assessment Platform</PageTitle>
      </PageHeader>
      <PageBody>
        <div className="grid grid-cols-4 min-h-0.90 m-2 mb-0 border border-solid border-slate-300 rounded">
          <Card title="Select Audit Type" className="bg-blue-100">
            <SelectAuditType onSelect={setType} type={type} />
          </Card>
          <Card title={`Select ${type === 0 ? "Product" : type === 1 ? "Scan" : "Cluster"}`} className="bg-green-100">
            <SelectProductType onSelect={setProduct} type={product} data={type === 0 ? Products : type === 1 ? [] : Clusters} />
          </Card>
          <Card title="Properties" className="bg-yellow-100">
          </Card>
          <Card title="Progress" className="bg-pink-100" last={true}>
          </Card>
        </div>
        <div className="inline-flex justify-end w-full mt-2">
          <IconButton id="form-submit-btn" title={"Submit"} icon={"Save"} onClick={onSave} iconSize="25" />
        </div>
      </PageBody>
    </Page>
  );
}

export default SecurityAuditManagement;

function Card({ title, className, children, last = false }) {
  return (
    <div className={`flex flex-col items-center py-2 space-y-2 ${last ? "" : "border-r border-slate-300"} ${className}`}>
      <label className="text-cds-ice-0600 text-xl font-medium">{title}</label>
      <div className="w-full border-t border-solid border-slate-300 pt-2 overflow-y-auto custom-scrollbar max-h-[480px]">
        {children}
      </div>
    </div>
  );
}

const AuditTypes = [
  { title: "Product", icon: "Inventory2TwoTone" },
  { title: "Vulnerability Scan", icon: "FindInPageTwoTone" },
  { title: "Cluster", icon: "AccountTreeTwoTone" }
];

const Products = [
  { title: "Site Manager", icon: "WebAssetTwoTone" },
  { title: "Knowledge Hub", icon: "HubTwoTone" },
  { title: "ORAN CU-CP", icon: "CellTowerTwoTone" },
  { title: "ORAN CU-UP", icon: "CellTowerTwoTone" },
  { title: "ORAN DU", icon: "CellTowerTwoTone" }
];

const Clusters = [
  { title: "SMO - Cluster1", icon: "HubTwoTone" },
  { title: "SMO - Cluster2", icon: "HubTwoTone" },
  { title: "ORAN - Cluster1", icon: "CellTowerTwoTone" },
  { title: "ORAN - Cluster2", icon: "CellTowerTwoTone" }
];

function SelectProductType({ type, data, onSelect }) {
  if (isEmpty(data)) return <EmptyIconRenderer title={`No ${type === 0 ? "Product" : type === 1 ? "Scan" : "Cluster"} data`} />;
  return (
    <div className="flex flex-col w-full items-center justify-center space-y-5">
      {data.map(({ title, icon }, i) => (
        <ProductButton id={i} onClick={() => onSelect(i)} icon={icon} key={i} iconSize="25" selected={i === type}>
          {title}
        </ProductButton>
      ))}
    </div>
  );
}

function ProductButton({ id, onClick, icon, children, selected }) {
  return (
    <button
      id={`product-type-${id}`}
      className={`w-56 bg-gradient-to-b from-green-600 to-green-800 hover:bg-green-700 p-5 rounded text-slate-100 hover:text-white ${selected ? "border-4 border-color-0300" : ""
        } shadow-md hover:shadow-2xl inline-flex items-center text-left text-lg font-medium select-none space-x-2`}
      onClick={onClick}
    >
      <IconRenderer icon={icon} style={{ fontSize: 30 }} />
      <span>{children}</span>
    </button>
  );
}

function SelectAuditType({ type, onSelect }) {
  return (
    <div className="flex flex-col w-full items-center justify-center space-y-5 px-10">
      {AuditTypes.map(({ title, icon }, i) => (
        <AuditButton id={i} onClick={() => onSelect(i)} icon={icon} key={i} iconSize="25" selected={i === type}>
          {title}
        </AuditButton>
      ))}
    </div>
  );
}

function AuditButton({ id, onClick, icon, children, selected }) {
  return (
    <button
      id={`audit-type-${id}`}
      className={`w-52 bg-gradient-to-b from-cyan-600 to-cyan-900 hover:bg-cyan-700 p-5 rounded text-slate-100 hover:text-white ${selected ? "border-4 border-color-0300" : ""
        } shadow-md hover:shadow-2xl inline-flex items-center text-left text-lg font-medium select-none space-x-2`}
      onClick={onClick}
    >
      <IconRenderer icon={icon} style={{ fontSize: 30 }} />
      <span>{children}</span>
    </button>
  );
}
