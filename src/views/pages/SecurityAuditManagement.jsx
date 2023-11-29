import React, { useState } from "react";
import { PageHeader, Page, PageBody, PageTitle } from "./common/PageLayoutComponents";
import TailwindRenderer from "../tailwindrender";
import IconButton from "../utilities/IconButton";
import axios from "axios";
import qs from "qs";
import { useDispatch } from "react-redux";
import { showMessage } from "../../redux/actions/MessageAction";

const schema = {
  type: "object",
  properties: {
    assementType: {
      type: "integer",
      oneOf: [
        {
          const: 1,
          title: "Image Scanning"
        },
        {
          const: 2,
          title: "CIS Host Scanning"
        },
        {
          const: 3,
          title: "SCA"
        },
        {
          const: 4,
          title: "Secrets Scanning"
        },
        {
          const: 5,
          title: "SAST"
        },
        {
          const: 6,
          title: "K8s CIS Benchmark"
        },
        {
          const: 7,
          title: "ORAN Testcases"
        }
      ]
    },
    image_registry: {
      type: "string",
      description: "sap.domain.com"
    },
    image_repository: {
      type: "string",
      description: "image or artifactory path"
    },
    image_tag: {
      type: "string",
      description: "Optional"
    },
    host_ip: {
      type: "string",
      description: "Host ip address"
    },
    host_port: {
      type: "string",
      description: "Optional, default is 22 port"
    },
    host_username: {
      type: "string",
      description: "Username of Host"
    },
    host_password: {
      type: "string",
      description: "Password of Host"
    },
    level: {
      type: "string",
      description: "Level-1 for base-level configurations and Level-2 for complete scan"
    },
    sca_git_repo: {
      type: "string",
      description: "Format : https://github.com/topics/example-repo"
    },
    secrets_ip: {
      type: "string",
      description: "SSH IP Address"
    },
    secrets_port: {
      type: "string",
      description: "Optional, default is 22 port"
    },
    secrets_username: {
      type: "string",
      description: "SSH Username"
    },
    secrets_password: {
      type: "string",
      description: "SSH Password"
    },
    secrets_file_path: {
      type: "string",
      description: "Absolute file path, ex format : /root"
    },
    sast_git_repo: {
      type: "string",
      description: "Format : https://github.com/topics/example-repo"
    },
    cis_ip: {
      type: "string",
      description: "SSH IP Address"
    },
    cis_port: {
      type: "string",
      description: "Optional, default is 22 port"
    },
    cis_username: {
      type: "string",
      description: "SSH Username"
    },
    cis_password: {
      type: "string",
      description: "SSH Password"
    },
    robin_ip: {
      type: "string",
      description: "robin cluster hostname or ip address"
    },
    robin_port: {
      type: "string",
      description: "robin cluster port"
    },
    robin_username: {
      type: "string",
      description: "robin cluster username"
    },
    robin_password: {
      type: "string",
      description: "robin cluster password"
    },
    oran_capability: {
      type: "string",
      description: "Optional : Specific Capabililty such as Data_Security, Authentication_Autherization"
    }
  },
  required: [
    "image_registry",
    "image_repository",
    "host_ip",
    "host_username",
    "host_password",
    "sca_git_repo",
    "secrets_ip",
    "secrets_username",
    "secrets_password",
    "secrets_file_path",
    "sast_git_repo",
    "cis_ip",
    "cis_username",
    "cis_password",
    "robin_ip",
    "robin_username",
    "robin_password"
  ]
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/assementType",
      label: "Security Assement Type"
    },
    {
      type: "CustomGroup",
      label: "Arguments",
      elements: [
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/image_registry",
              label: "Registry",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 1
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/image_repository",
              label: "Repository",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 1
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/image_tag",
              label: "TAG",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 1
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/host_ip",
              label: "SSH IP Address",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 2
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/host_port",
              label: "SSH Port",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 2
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/host_username",
              label: "SSH Username",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 2
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/host_password",
              label: "SSH Password",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 2
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/level",
              label: "Level",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 2
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/sca_git_repo",
              label: "Git Repo",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 3
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/secrets_ip",
              label: "SSH IP Address",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 4
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/secrets_port",
              label: "SSH Port",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 4
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/secrets_username",
              label: "SSH Username",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 4
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/secrets_password",
              label: "SSH Password",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 4
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/secrets_file_path",
              label: "File System Path",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 4
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/sast_git_repo",
              label: "Git Repo",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 5
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/cis_ip",
              label: "SSH IP Address",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 6
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/cis_port",
              label: "SSH Port",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 6
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/cis_username",
              label: "SSH Username",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 6
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/cis_password",
              label: "SSH Password",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 6
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/robin_ip",
              label: "SSH IP",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 7
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/robin_port",
              label: "SSH Port",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 7
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/robin_username",
              label: "SSH Username",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 7
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/robin_password",
              label: "SSH Password",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 7
                }
              }
            },
            {
              type: "Control",
              scope: "#/properties/oran_capability",
              label: "ORAN Capability",
              rule: {
                effect: "SHOW",
                condition: {
                  type: "LEAF",
                  scope: "#/properties/assementType",
                  expectedValue: 7
                }
              }
            }
          ]
        }
      ]
    }
  ]
};

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

  return (
    <Page>
      <PageHeader>
        <PageTitle>Security Assessment Platform</PageTitle>
      </PageHeader>
      <PageBody>
        <TailwindRenderer id="json-forms" schema={schema} uischema={uischema} data={payload} onChange={(d) => setPayload(d.data)} />
        <div className="flex border-t border-solid border-slate-800 justify-end w-full mt-1.5 pt-2">
          <IconButton id="form-submit-btn" title={"Submit"} icon={"Save"} onClick={onSave} />
        </div>
      </PageBody>
    </Page>
  );
}

export default SecurityAuditManagement;
