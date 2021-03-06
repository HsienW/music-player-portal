import React from 'react';
import ReactDOM from 'react-dom';
import {singleAppGlobalState} from 'music-player-common';
import {globalActiveListener} from 'music-player-common';
import {globalActiveMediator} from 'music-player-common';
import {observer, observerKey} from 'music-player-common';
import {PortalRootDom} from './root/root';
import './public-path';

function renderPortalRoot(props) {
    const {container, routerBase, setGlobalState, getGlobalState, onStateChange, observer, observerKey} = props;
    const authRedirectURL = `${routerBase}/home`;
    sessionStorage.setItem('auth-redirect-url', JSON.stringify(authRedirectURL));
    ReactDOM.render(
        <PortalRootDom
            routerBase={routerBase}
            setGlobalState={setGlobalState}
            getGlobalState={getGlobalState}
            onStateChange={onStateChange}
            observer={observer}
            observerKey={observerKey}
        />,
        container ? container.querySelector('#portal-root') : document.querySelector('#portal-root')
    );
}

function renderSinglePortalRoot(props) {
    import ('music-player-common/src/containers/loading-spin/loading-spin');
    import ('music-player-common/src/containers/side-bar/side-bar');
    import ('music-player-common/src/containers/header-bar/header-bar');
    import ('music-player-common/src/containers/player-bar/player-bar');
    import ('./root/root.scss');

    const {container, routerBase, setGlobalState, getGlobalState, onStateChange, observer, observerKey} = props;

    ReactDOM.render(
        <>
            <auth-container/>
            <loading-spin-container/>
            <div className="main-layout">
                <div className="side-layout">
                    <side-bar-container/>
                </div>
                <div className="header-layout">
                    <header-bar-container/>
                </div>
                <div className="content-layout">
                    <PortalRootDom
                        routerBase={routerBase}
                        setGlobalState={setGlobalState}
                        getGlobalState={getGlobalState}
                        onStateChange={onStateChange}
                        observer={observer}
                        observerKey={observerKey}
                    />
                </div>
                <div className="footer-layout">
                    <player-bar-container/>
                </div>
            </div>
        </>,
        container ? container.querySelector('#portal-root') : document.querySelector('#portal-root')
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    console.log('portal ??????????????????');

    const routerBase = '/portal';
    const authRedirectURL = `${routerBase}/home`;
    const {getGlobalState, setGlobalState} = singleAppGlobalState;
    const props = {routerBase, getGlobalState, setGlobalState, observer, observerKey};

    sessionStorage.setItem('auth-redirect-url', JSON.stringify(authRedirectURL));
    singleAppGlobalState.setGlobalState('init', 'portal ??????????????????');
    globalActiveListener.initAllAction();
    globalActiveMediator.callAction('initGlobalMediatorSubscribe');

    renderSinglePortalRoot(props);
}

/**
 * bootstrap ????????? init ????????? call ??????, ??????????????????????????? call mount hook
 * ???????????? bootstrap hook ?????????????????? global ????????? init, ??????????????? unmount ???????????? catch
 */
export async function bootstrap() {
    console.log('react app bootstrap is work');
}

/**
 * ?????????????????????????????? call mount, ?????? render ??????????????? call
 */
export async function mount(props) {
    renderPortalRoot(props);
}

/**
 * ???????????? or ???????????????????????? call unmount, ???????????????????????????????????? instance
 */
export async function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('portal-root'));
}
