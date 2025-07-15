import React, { useState } from "react";

const SITES = [
  {
    name: "오구",
    url: "https://orinugur.github.io/my-portfolio123/ogu/"
  },
  {
    name: "2번 사이트",
    url: "https://orinugur.github.io/my-portfolio123/2"
  },
  {
    name: "O",
    url: "https://orinugur.github.io/my-portfolio123/o/"
  }
];

function SiteViewer() {
  const [selected, setSelected] = useState(SITES[0].url);

  return (
    <div className="site-viewer">
      <div className="site-selector">
        {SITES.map(site => (
          <button
            key={site.url}
            className={selected === site.url ? "active" : ""}
            onClick={() => setSelected(site.url)}
          >
            {site.name}
          </button>
        ))}
      </div>
      <div className="iframe-container">
        <iframe
          title="외부사이트"
          src={selected}
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default SiteViewer;