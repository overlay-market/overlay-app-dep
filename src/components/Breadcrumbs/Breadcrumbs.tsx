import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import routesConfig from '../../routes/routesConfig';
import { ChevronRight } from 'react-feather';
import { Icon } from '../Icon/Icon';

const Container = styled.div<{ padding?: string }>`
  display: flex;
  flex-direction: row;
  padding: ${({padding}) => ( padding ? padding : '0')};
`;

const Breadcrumb = styled.div`
  color: ${({theme}) => theme.text1};
  display: flex;
  flex-direction: row;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({theme}) => theme.text1};
  text-decoration: none;
  font-size: 12px;

`;

const ActiveNavLink = styled(StyledNavLink)`
  font-weight: 700;
`;

export const Breadcrumbs = ({
  padding
}:{
  padding?: string
}) => {
  const breadcrumbs = useBreadcrumbs(routesConfig);

  return (
    <Container padding={padding}>
        {breadcrumbs.map(({
          match,
          breadcrumb
          }, index) => (
            <Breadcrumb key={match.url}>
              {index !== breadcrumbs.length - 1 ? (
                <ActiveNavLink to={match.url}>
                  {breadcrumb}
                </ActiveNavLink>
              ):(
                <StyledNavLink to={match.url}>
                    {breadcrumb}
                </StyledNavLink>
              )}
              {index < breadcrumbs.length - 1 && (
                <Icon size={8} margin={'auto'}>
                  <ChevronRight height={8} width={8} />
                </Icon>
              )}
            </Breadcrumb>
          ))}
      </Container>
  );
};
