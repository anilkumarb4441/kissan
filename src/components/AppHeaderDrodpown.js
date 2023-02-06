import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle, CNavLink, CSidebarNav
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilApplications,
  cilShareBoxed,
  cibAboutMe,
  cilPeople,
  cilMediaRecord,
  cilHistory,
  cilReportSlash
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'
// import avatar8 from './../assets/images/avatars/8.jpg'
// import SessionManager from 'src/stores/SessionManager'

// import { openAccessDialog, closeAccessDialog, } from './../components/pages/auth/AuthenticationDialog/action'
import { connect } from 'react-redux';

// const logoutSession = () => {

//   SessionManager.logout()
// }

const AppHeaderDropdown = (props) => {
  const [user, setUser] = useState(SessionManager.getUser())
  const [roles, setRoles] = useState(SessionManager.getRole())

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          {/* {user.gender ? */}
            <CAvatar src={user.gender} size="md" />
            {/* :
            <CAvatar src={avatar8} size="md" />
          } */}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
          <CDropdownItem >
            <CNavLink component={NavLink}>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CNavLink>
          </CDropdownItem>
          <CDropdownItem >
            <CNavLink component={NavLink}>
              <CIcon icon={cilShareBoxed} className="me-2" />
              My Orders
            </CNavLink>
          </CDropdownItem>
          {/* {roles == "SanchariAdmin" ? */}
          <CDropdownItem href="#">
            <CNavLink>
              <CIcon icon={cilApplications} className="me-2" />
              My Companies
            </CNavLink>
          </CDropdownItem>
          {/* :
          null} */}
          <CDropdownItem href="#">
            <CNavLink component={NavLink}>
              <CIcon icon={cilHistory} className="me-2" />
              My Services
            </CNavLink>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CNavLink component={NavLink}>
              <CIcon icon={cilFile} className="me-2" />
              My Reports
            </CNavLink>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CNavLink component={NavLink}>
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CNavLink>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CNavLink component={NavLink}>
              <CIcon icon={cilPeople} className="me-2" />
              About Us
            </CNavLink>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem  onClick={logoutSession}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>

  )
}

// const mapStateToProps = (state) => {
//   return {
//     accessDialogOpened: state.AuthenticationReducer.accessDialogOpened
//   };
// };

// export default connect(mapStateToProps,
//   { openAccessDialog, closeAccessDialog, })(AppHeaderDropdown);
export default AppHeaderDropdown


