import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import routesConfig from '../../routes/routesConfig';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routesConfig);

  return (
    <>
      {breadcrumbs.map(({
        match,
        breadcrumb
      }) => (
        <span key={match.url}>
          <NavLink to={match.url}>{breadcrumb}</NavLink>
        </span>
      ))}
    </>
  );
};