import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import StudentDoTest from './pages/StudentDoTest';


function App() {
    return (
        <Router>
                
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/pricing" exact component={Pricing} />
                    <Route path="/aboutus" exact component={AboutUs} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/exam/:id" exact component={StudentDoTest} />
                    
                    <Route path="*" component={NotFound} />
                </Switch> 
            </Router>
		//   <Home />
    );
}

export default App;
