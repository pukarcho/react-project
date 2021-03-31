import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide, toast } from 'react-toastify';

import './toastify.css';

function Toastify() {
   
    
    return (
        <ToastContainer 
            position={toast.POSITION.BOTTOM_RIGHT}
            transition={Slide}
            draggable={false}
            newestOnTop={true}
        />
    );
}

export default Toastify;