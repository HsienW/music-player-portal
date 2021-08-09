import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import '../../../common/containers/auth/auth';
import './root.scss';

const Login = () => {
    return <auth-container/>;
};

const Home = () => {
    return <h2>Home</h2>;
};

const PortalPage2 = () => {
    return <h2>Portal Page 2</h2>;
};

export const PortalRootDom = (props) => {
    const {routerBase, setGlobalState, getGlobalState} = props;
    const defaultValue = getGlobalState('init');
    const [testValue, changeValue] = useState(defaultValue);

    const click = (handler) => {
        const newValue = Math.floor(Math.random() * 9) + 1;
        changeValue(newValue);
        console.log(getGlobalState('init'));
        return handler({init: newValue});
    };

    return (
        <div>
            <div className='portal-root-title'>Portal root dom is working!</div>
            <div>test: {testValue}</div>
            <button onClick={() => click(setGlobalState)}>test</button>
            <BrowserRouter>
                <ul>
                    <li>
                        <Link to={`${routerBase}/home`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`${routerBase}/portal-page2`}>Portal Page2</Link>
                    </li>
                    <li>
                        <Link to={'/search'}>Go to Search</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path={`${routerBase}/login`}>
                        <Login/>
                    </Route>
                    <Route path={`${routerBase}/home`}>
                        <Home/>
                    </Route>
                    <Route path={`${routerBase}/portal-page2`}>
                        <PortalPage2/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};
