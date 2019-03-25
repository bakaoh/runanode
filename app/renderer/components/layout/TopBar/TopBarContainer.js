// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import types from 'renderer/types';
import { compose, lifecycle, withState } from 'recompose';
import TopBar from ".";

const mapStateToProps = ({ nodeSystem, remoteStream, nodeStateStore, blocksNew, blocksFinalised, blocksRemote }) => ({
  nodeSystem,
  remoteStream,
  nodeStateStore,
  blocksNew,
  blocksFinalised,
  blocksRemote,
});

const mapDispatchToProps = dispatch => ({
  onSwitchNetwork: payload => {
    dispatch({ type: types.storeNetworkOption.triggered, payload });
  },
});

const enhance = compose(
  withState('isOpenNetworkWarningModal', 'setIsOpenNetworkWarningModal', false),
  withState('isUploadGenesisModal', 'setIsOpenUploadGenesisModal', false),
  withState('selectedNetwork', 'setSelectedNetwork', null),
  withState('genesisFile', 'setUpGenesisFile', null)
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  enhance
);
