import React from 'react';

import { toast } from 'react-toastify';

import sadRobot from '../../sad-robot.png';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        toast.error(`Ops... Something went wrong`);
    }
  
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h3 style={{textAlign: "center"}}>Please contact Administrator for more help.</h3>
                    <img src={sadRobot} alt="error" style={{marginLeft: "calc(50% - 298px)"}} />
                </div>
            );
        }
  
        return this.props.children; 
    }
}

export default ErrorBoundary;