import { Link } from "react-router-dom";    
 
export default function UpdateFooterImage(){
    return(
        <>
        <div class='d-flex'>
             <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Update Footer Image</h1>
                </div>      
                <div class="dashboard-card p-4">
                    <form>
                        <div class="mb-3">  
                            <label for="footerImage" class="form-label">Footer Image</label>
                            <input type="file" class="form-control" id="footerImage" />
                        </div>
                        <Link to='' type="submit" class="btn btn-primary">Update Image</Link>
                    </form>
                </div>
            </main>
        </div>
        </>
    )
}
