import React, { useEffect } from 'react';
import Button from 'components/Button';
import styled from 'styled-components';
import Spinner from 'components/Spinner';
import { Layout, LayoutWrapper, MainContent } from 'components/layout';
import SideNav from 'components/layout/SideNav';
import SimpleSidebar from 'components/layout/SimpleSidebar';
import { Logger } from 'renderer/utils/logging';
import { environment } from 'common/environment';
import withContainer from './container';

const { isDevOrDebugProd } = environment;

const SpinnerWrapper = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const HomePage = ({ hasBlockNumbers, onPageNavigation }) => {
  useEffect(() => {
    Logger.debug(`HomePage, hasBlockNumbers: ${hasBlockNumbers}`);
    if (hasBlockNumbers) {
      onPageNavigation();
    }
  }, [hasBlockNumbers]);

  return (
    <Layout sidebar={isDevOrDebugProd ? <SideNav /> : <SimpleSidebar />}>
      <LayoutWrapper>
        <MainContent>
          <SpinnerWrapper>
            <Spinner size="xl" />
          </SpinnerWrapper>
        </MainContent>
      </LayoutWrapper>
    </Layout>
  );
};
export default withContainer(HomePage);
