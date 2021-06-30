import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './root.scss';

const Home = () => {
    return <h2>Portal Home</h2>;
};

const Demo = () => {
    return <h2>Portal Demo</h2>;
};

const click = (handler) => {
    return handler( {
        init: 'change'
    });
};

export const PortalRootDom = (props) => {
    const { routerBase, getGlobalState, setGlobalState } = props;

    console.log(getGlobalState('init'));

    return (
        <div>
            <h2 className='portal-root-title'>Portal root dom is working!</h2>
            <div>test: {getGlobalState('init')}</div>
            <button onClick={() => {click(setGlobalState);}}>test</button>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to={`${routerBase}/home`}>Home</Link>
                            </li>
                            <li>
                                <Link to={`${routerBase}/demo`}>Demo</Link>
                            </li>
                            <li>
                                <Link to={'/search'}>Go to Search</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path={`${routerBase}/home`}>
                            <Home />
                        </Route>
                        <Route path={`${routerBase}/demo`}>
                            <Demo />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
