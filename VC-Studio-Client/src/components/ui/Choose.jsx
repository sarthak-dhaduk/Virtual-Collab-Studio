import ChooseImg from "./ChooseImg";
import ChooseContent from "./ChooseContent";
import ChooseContentParra from "./ChooseContentParra";
const Choose=()=>{

    return(
        <>
        
        <div className="card-body mx-4 bg-black">
                                <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                                    <ChooseImg></ChooseImg>
                                    <div className="text-white">
                                    <ChooseContent></ChooseContent>
                                    <ChooseContentParra></ChooseContentParra>
                                    </div>
                                    
                                </div>
                            </div>

        </>
    )

}

export default Choose;