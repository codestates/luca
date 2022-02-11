import styled from "styled-components";

const ProjectcardBody = styled.div`
    background-color: seashell;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    > projectcardhead {
        background-color: #f5f5f5;
        display: flex;
        flex-direction: row;
        justify-content: space-between; 
        align-items: center;
        height: 40px;
        > projectname {
            display: flex;
            justify-content: row;
            align-items: center;
            > h2 {
                min-width: 200px;
                width: auto;
            }
            > date {
                margin-left: 20px;
            }
        }
        > projectfunc {
            display: flex;
            text-align: center;
            height: 100%;
            > type {
                border: solid;
                height: 90%;
                width: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 30px;
            }
            > modifybox {
                border: solid;
                height: 90%;
                width: 90px;
                margin-left: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
    > projectcardbottom {
        display: flex;
        justify-content: space-between;
        > desc {
            min-width: 350px;
            width: auto;
        }
        > projectinfo {
            min-width: 350;
            width: auto;
        }
    }
`

function Projectcard () {
    return (
        <ProjectcardBody>
            <projectcardhead>
                <projectname>
                    <h2>
                        tutorial
                    </h2>
                    <date>
                        3weeks ago
                    </date>
                </projectname>
                <projectfunc>
                    <type>
                        private
                    </type>
                    <modifybox>
                    <i class="fa-regular fa-pen-to-square"></i>
                    klj
                    </modifybox>
                </projectfunc>
            </projectcardhead>
            <projectcardbottom>
                <desc>
                    파이널 프로젝트에 관한 아이디어
                </desc>
                <projectinfo>
                    5명의 참여자, 30개의 카드, 23개의 매칭
                </projectinfo>
            </projectcardbottom>
        </ProjectcardBody>
    )
}

export default Projectcard;