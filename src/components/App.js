import React, { useState, useEffect, useContext } from 'react';

//custom hooks
import { useUIStateManager } from '../customHooks/useUIStateManager'
import useDesignManager from '../customHooks/useDesignManager';
//context
import { ModeContext, CustomSpecContext, UserContext, SavedDesignsContext } from '../context';

//components
import Header from './Header';
import Home from './Home';
import CustomSpecification from './CustomSpecification';
import Account from './Account';
import History from './History';
//aws
import Amplify from 'aws-amplify';
import config from '../aws-exports';
import { Auth, Hub } from 'aws-amplify';


Amplify.configure(config)

export default function App() {
  const [user, setUser] = useState(null)

  //set up mode context
  const [activeMainComponent, setActiveMainComponent] = useState('home');

  //set up customSpecContext
  const [customSpecState, setCustomSpecState] = useState({
    style: '',
    image: null,
    scale: null,
    shape: null
  });

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "signOut") {
        setUser(null);
        setActiveMainComponent('home')
      } else if (event === 'signIn') {
        Auth.currentAuthenticatedUser().then(u => setUser(u))
      }
    });
  });

  const [customSpecUIState, setActiveCustomSpecPhase] = useUIStateManager();
  const custom = { customSpecState, setCustomSpecState, customSpecUIState, setActiveCustomSpecPhase };
  //saved designs
  const [designs, status, refresh] = useDesignManager(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModeContext.Provider value={{ activeMainComponent, setActiveMainComponent }}>
        <CustomSpecContext.Provider value={custom}>
          <SavedDesignsContext.Provider value={{designs, status, refresh}}>
            <Header />
            <MainComponent />
          </SavedDesignsContext.Provider>
        </CustomSpecContext.Provider>
      </ModeContext.Provider>
    </UserContext.Provider>
  )
}

const MainComponent = () => {
  const { activeMainComponent } = useContext(ModeContext)

  switch (activeMainComponent) {
    case 'home':
      return (<Home />)
    case 'customSpec':
      return <CustomSpecification />
    case 'account':
      return <Account />
    case 'history':
      return < History />
    default:
      console.log('default')
  }
}