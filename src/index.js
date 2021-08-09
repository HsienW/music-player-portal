import React from 'react';
import ReactDOM from 'react-dom';
import { singleAppGlobalState } from '../../common/state/single-app-global-state';
import { globalActiveListener } from '../../common/listener/global-active-listener';
import { PortalRootDom } from './root/root';
import './public-path';

function renderPortalRoot(props) {
    const {container, routerBase, setGlobalState, getGlobalState, onStateChange} = props;
    ReactDOM.render(
        <PortalRootDom
            routerBase={routerBase}
            setGlobalState={setGlobalState}
            getGlobalState={getGlobalState}
            onStateChange={onStateChange}
        />,
        container ? container.querySelector('#portal-root') : document.querySelector('#portal-root')
    );
}

function renderSinglePortalRoot(props) {
    import ('../../common/containers/loading-spin/loading-spin');
    import ('../../common/containers/side-bar/side-bar');
    import ('../../common/containers/header-bar/header-bar');
    import ('../../common/containers/player-bar/player-bar');
    import ('./style/sub-app-portal-main.scss');

    const {container, routerBase, setGlobalState, getGlobalState, onStateChange} = props;

    ReactDOM.render(
        <>
            <div className="main-layout">
                <div className="side-layout">
                    <side-bar-container></side-bar-container>
                </div>
                <div className="header-layout">
                    <header-bar-container></header-bar-container>
                </div>
                <div className="content-layout">
                    <PortalRootDom
                        routerBase={routerBase}
                        setGlobalState={setGlobalState}
                        getGlobalState={getGlobalState}
                        onStateChange={onStateChange}
                    />
                </div>
                <div className="footer-layout">
                    <player-bar-container></player-bar-container>
                </div>
            </div>
            <loading-spin-container></loading-spin-container>
        </>,
        container ? container.querySelector('#portal-root') : document.querySelector('#portal-root')
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    console.log('portal 我自己運行了');

    const routerBase = '/sub-app-portal';
    const { getGlobalState, setGlobalState } = singleAppGlobalState;
    const props = { routerBase, getGlobalState, setGlobalState };

    singleAppGlobalState.setGlobalState('init', 'portal 我自己運行了');
    globalActiveListener.initAllAction();

    renderSinglePortalRoot(props);
}

/**
 * bootstrap 只會再 init 的時候 call 一次, 之後重新加載會直接 call mount hook
 * 通常這個 bootstrap hook 是用來做一些 global 變數的 init, 像是不會再 unmount 被清掉的 catch
 */
export async function bootstrap() {
    console.log('react app bootstrap is work');
}

/**
 * 每次加載進子專案都會 call mount, 一般 render 也會在這邊 call
 */
export async function mount(props) {
    renderPortalRoot(props);
}

/**
 * 每次切換 or 卸載進子專案都會 call unmount, 一般會在這裡銷毀子專案的 instance
 */
export async function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('portal-root'));
}
