import React from 'react';
import jdenticon from 'jdenticon';
import styled from 'styled-components';
import SVGInline from 'react-svg-inline';
import { Ellipsis, Table } from 'components';
import { colors } from 'renderer/theme';

const ListWrapper = styled.div`
  width: 49%;
`;

const NoDataText = styled.div`
  margin: 1rem;
`;

const YourAccountText = styled.div`
  margin: 0 0.4rem;
`;

const WaitingList = ({ waitingList, stakingStashAccountAddress }) => {
  const titleSuffix = waitingList.length ? `(${waitingList.length})` : '';
  return (
    <ListWrapper>
      <Table
        NoDataComponent={() => <NoDataText>There’s no intention in the queue.</NoDataText>}
        data={waitingList}
        page={0}
        pageSize={100}
        getTrProps={(state, rowInfo, column) => {
          if (rowInfo.row.waitingList) {
            return {
              style: {
                background:
                  rowInfo.row.waitingList.address === stakingStashAccountAddress &&
                  colors.trGradient,
              },
            };
          }
        }}
        columns={[
          {
            Header: () => (
              <div
                style={{
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {`Pool ${titleSuffix}`}
              </div>
            ),
            id: 'waitingList',
            accessor: d => d,
            Cell: ({ value }) => {
              return (
                <div
                  style={{
                    color: colors.N300,
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <Ellipsis substrLength={6}>{(value && value.address) || 'Error'}</Ellipsis>
                  {value && value.address === stakingStashAccountAddress && (
                    <YourAccountText>(You)</YourAccountText>
                  )}
                </div>
              );
            },
          },
          {
            // TODO: Handle later
            Header: () => (
              <div
                style={{
                  width: '100%',
                  textAlign: 'right',
                }}
              >
                Amount (CENNZ)
              </div>
            ),
            id: 'balances',
            accessor: d => d,
            Cell: ({ value }) => {
              return (
                <div
                  style={{
                    color: colors.N300,
                    width: '100%',
                    textAlign: 'right',
                  }}
                >
                  <Ellipsis substrLength={6}>{(value && value.cennzBalance) || 'Error'}</Ellipsis>
                </div>
              );
            },
          },
        ]}
        showPaginationBottom={false}
      />
    </ListWrapper>
  );
};

export default WaitingList;
