import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './components/HomePage'
import JobsPage from './components/JobsPage'
import JobDetails from './components/JobDetailes'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here

const App = () => (
  <div className="jobby-app-bg-container">
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <ProtectedRoute path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
