import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
  crumbs: any
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps ) => {
  // Don't render a single breadcrumb.
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <div>
      {/* Link back to any previous steps of the breadcrumb. */}
      {crumbs.map(({ name, path } : { name:any, path:any} , key:any) =>
        key + 1 === crumbs.length ? (
          <span key={key} className="bold">
            {name}
          </span>
        ) : (
          <Link key={key} to={path}>
            {name}
          </Link>
        )
      )}
    </div>
  );
};

// export default Breadcrumbs;
