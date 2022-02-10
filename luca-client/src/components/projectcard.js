

function Projectcard () {
    return (
        <div className="project-card">
            <div className="projectcard-head">
                <div>
                    <topic>
                        tutorial
                    </topic>
                    <date>
                        3weeks ago
                    </date>
                </div>
                <div>
                    <type>
                        private
                    </type>
                    <modifybox>
                    <i class="fa-regular fa-pen-to-square"></i>
                    </modifybox>
                </div>
            </div>
            <div className="projectcard-bottom">
                <desc>
                    파이널 프로젝트에 관한 아이디어
                </desc>
                <projectinfo>
                    5명의 참여자, 30개의 카드, 23개의 매칭
                </projectinfo>
            </div>
        </div>
    )
}

export default Projectcard;