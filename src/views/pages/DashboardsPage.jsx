import React from "react";
import { PageHeader, Page, PageBody, PageTitle } from "./common/PageLayoutComponents";
import dashboards from "../../assets/json/dashboards.json";

function DashboardsPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Dashboard Links</PageTitle>
      </PageHeader>
      <PageBody>
        <div className="grid grid-cols-2 gap-5 w-full p-5">
          {dashboards.map((dashboard) => (
            <Card {...dashboard} />
          ))}
        </div>
      </PageBody>
    </Page>
  );
}

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

function Card({ title, description, link }) {
  return (
    <div
      className="flex rounded-lg h-full p-8 flex-col shadow-xl hover:shadow-2xl cursor-pointer border-2 bg-slate-100"
      onClick={() => {
        link && openInNewTab(link);
      }}
    >
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium">{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
export default DashboardsPage;
