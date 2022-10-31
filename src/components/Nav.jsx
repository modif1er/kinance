import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "store";
import { Button, Classes, Navbar, NavbarDivider, NavbarHeading, NavbarGroup } from "@blueprintjs/core";

export { Nav };

function Nav() {
  const authUser = useSelector(x => x.auth.user);
  const dispatch = useDispatch();
  const logout = () => dispatch(authActions.logout());

  if (!authUser) return null;

  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>KINANCE</NavbarHeading>
        <NavbarDivider />
        <NavLink to="/">
          <Button className={Classes.MINIMAL} icon="home" text="Home" />
        </NavLink>
        <Button className={Classes.MINIMAL} icon="unlock" text="Logout" onClick={logout} />
      </NavbarGroup>
    </Navbar>
  );
}