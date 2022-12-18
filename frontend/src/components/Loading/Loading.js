
import './Loading.css';
import { LinearProgress } from "@mui/material";

const Loading = () => {
    return (
        <div className="container">
            <h2 className="uploading-header">Uploading...</h2>
            <LinearProgress className="progress-bar" />
        </div>
    )
}


export default Loading;