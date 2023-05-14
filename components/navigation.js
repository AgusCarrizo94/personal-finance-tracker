// Icon
import {ImStatsBars} from 'react-icons/im'

function Nav() {
    return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center gap-2">
          {/* Image */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://this-person-does-not-exist.com/img/avatar-gen112a23c2561fe0cf215a3e311225dc2f.jpg"
              alt="Profile Image"
            />
          </div>
          {/* Name */}
          <small>Hi, Agustin!</small>
        </div>
        {/* Right side of our navigation */}
        <nav className="flex items-center gap-4">
          <div>
            <ImStatsBars className="text-2xl"/>
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
    )
}

export default Nav;