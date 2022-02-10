import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Projectcard from "../components/projectcard";

export function Mainpage () {
    return (
        <div>
            <div>
                {/* navbar */}
            </div>
            <div className="body">
                <div className="start-box">
                    <div className="desc">
                        Lorem ipsum
                    </div>
                    <div>
                        <button className="start-button">start</button>
                    </div>
                </div>
                <div className="project-container">
                    <sortbox>
                        sort by update  ▼
                    </sortbox>
                    <projectbox>
                        <Projectcard />
                    </projectbox>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}

export default Mainpage;