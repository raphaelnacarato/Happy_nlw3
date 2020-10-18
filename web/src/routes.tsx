import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import CreateOrphanage from './pages/CreateOrphanage'
import Orphanage from './pages/Orphanage'

function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Redirect exact from='/' to='/app' />
            <Route exact path='/app' component={Landing} />
            <Route exact path='/orphanages' component={OrphanagesMap} />
            <Route path='/orphanages/create' component={CreateOrphanage} />
            <Route path='/orphanages/:id' component={Orphanage} />
         </Switch>
      </BrowserRouter>
   )
}

export default Routes
