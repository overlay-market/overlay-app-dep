import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import routesConfig from '../../routes/routesConfig';
import { ChevronRight } from 'react-feather';

const Breadcrumb = styled.span`
  color: ${({theme}) => theme.text1};
`;

const StyledNavLink = styled(NavLink)`
  color: ${({theme}) => theme.text1};
  text-decoration: none;
  font-size: 12px;
`;

const ActiveNavLink = styled(StyledNavLink)`
  font-weight: 700;
`;

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routesConfig);

  return (
    <>
      {breadcrumbs.map(({
        match,
        breadcrumb
      }, index) => (
        <Breadcrumb key={match.url}>
          {index === breadcrumbs.length - 1 ? (
            <ActiveNavLink to={match.url}>
              {breadcrumb}
            </ActiveNavLink>
          ):(
            <StyledNavLink to={match.url}>
                {breadcrumb}
            </StyledNavLink>
          )}
          {index < breadcrumbs.length - 1 && <ChevronRight height={8} width={8} />}
        </Breadcrumb>
      ))}
    </>
  );
};