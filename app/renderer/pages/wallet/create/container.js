import { connect } from 'react-redux';
import { compose, lifecycle, withState, withStateHandlers } from 'recompose';
import types from 'renderer/types';
import { STEPS } from './constants';

const mapStateToProps = ({
  nodeSystem: {
    localNode: { chain },
  },
}) => ({
  networkName: chain,
});

const mapDispatchToProps = dispatch => ({
  onCreateWallet: payload => {
    dispatch({ type: types.walletCreate.requested, payload });
  },
  onCreatePaperWallet: payload => {
    dispatch({ type: types.walletPaperGenerate.requested, payload });
  },
});

const enhance = compose(
  lifecycle({
    componentDidMount() {},
  }),
  withState('isStoreWarningModalOpen', 'setStoreWarningModalOpen', false),
  withState('isSeedPhaseDownloadModalOpen', 'setSeedPhaseDownloadModalOpen', false),
  withStateHandlers(
    ({
      initStep = STEPS.NAME_INPUT,
      initMnemonic = '',
      initWalletName = '',
      initIsOpenPenPrepareModal = false,
    }) => ({
      step: initStep,
      mnemonicString: initMnemonic,
      walletName: initWalletName,
      isOpenPenPrepareModal: initIsOpenPenPrepareModal,
    }),
    {
      moveToStep: () => val => ({ step: val }),
      setMnemonicString: () => val => ({ mnemonicString: val }),
      setWalletName: () => val => ({ walletName: val }),
      setIsOpenPenPrepareModal: () => val => ({ isOpenPenPrepareModal: val }),
    }
  )
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  enhance
);