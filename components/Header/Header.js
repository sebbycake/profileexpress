import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Header.module.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);

  const router = useRouter();

  return (
    <header className={`container ${styles.container_header}`}>
      <div className={styles.logo_container}>
        <img
          src="/logo.png"
          alt="ProfileSpace's Logo"
          className={styles.logo_img}
        />
        <h3 className={styles.logo_title}>rofileExpress</h3>
      </div>

      <nav
        className={`${styles.nav_links} ${
          isNavActive ? "" : styles.nav_inactive
        }`}
      >
        <Link className={styles.nav_link} href="#">
          Community
        </Link>
        <Link className={styles.nav_link} href="#">
          Features
        </Link>
        <Link className={styles.nav_link} href="#">
          Pricing
        </Link>
      </nav>

      <div className={`${styles.hidden} ${styles.burger_menu}`}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={() => router.push("#")}>Community</MenuItem>
            <MenuItem onClick={() => router.push("#")}>Features</MenuItem>
            <MenuItem onClick={() => router.push("#")}>Pricing</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
