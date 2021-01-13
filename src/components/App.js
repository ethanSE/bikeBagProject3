import React, { useState, useEffect, useContext } from 'react';
//hooks
import { useUIStateManager } from '../customHooks/useUIStateManager'
//context
import { ModeContext, CustomSpecContext, UserContext } from '../context';

//components
import Header from './Header';
import Home from './Home';
import CustomSpecification from './CustomSpecification';
import Account from './Account';
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModeContext.Provider value={{ activeMainComponent, setActiveMainComponent }}>
        <CustomSpecContext.Provider value={custom}>
          <Header />
          <MainComponent />
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
    default:
      console.log('default')
  }
}