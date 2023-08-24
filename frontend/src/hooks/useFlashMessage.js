import bus from "../utils/bus"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function useFlashMessage() {
    function setFlashMessage(msg, type) {


        const myEventHandler = () => {
            type === 'error' ? toast.error(msg, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }) : toast.success(msg, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        };


        bus.addListener('flash', myEventHandler);

        bus.emit('flash');

        bus.removeListener('flash', myEventHandler);

    }



    return { setFlashMessage }
}