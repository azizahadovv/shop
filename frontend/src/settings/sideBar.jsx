import {GiHamburgerMenu} from "react-icons/gi";
import {Link} from "react-router";

export default function SideBar() {
    return <div>
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"

                data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <GiHamburgerMenu/>
        </button>

        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions"
             aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column gap-3" >

                <Link to={'?category'} className={'btn btn-danger w-100'}>Category</Link>
                <Link to={'?product'} className={'btn btn-danger w-100'}>product</Link>
                <Link to={'?users'} className={'btn btn-danger w-100'}>users</Link>
                <Link to={'?orders'} className={'btn btn-danger w-100'}>orders</Link>

            </div>
        </div>


    </div>
}