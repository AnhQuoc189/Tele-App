import React, { useState, useEffect } from "react"
import styles from "./navbar.module.css"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import decode from "jwt-decode"
import * as actionType from "../../constants/actionTypes"
import globe from "../../assets/globe.svg"
import contact from "../../assets/contact.svg"
import  login  from "../../assets/login.svg"
import home from "../../assets/home.svg"
import education from "../../assets/education.svg"
import logo from "../../assets/logo.png"
import telehome from "../../assets/telehome.png"
import telelogo from "../../assets/telelogo.png"
import { changeLanguage } from "../../actions/language"

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)
  const socket = useSelector((state) => state.socket.socket)

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    history.push("/auth")
    setUser(null)
    socket.disconnect()
  }

  useEffect(() => {
    const token = user?.accessToken
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles["menu-right"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-logo"]}>
              <Link to="/" className={styles["tele-link"]}>
                <img style={{height:"40px",borderRadius:"50%"}}src={telehome} alt="logoname" className={styles["tele-img"]}></img>
              </Link>
              <Link to="/" className={styles["logo-link"]}>
                <img style={{height:"50px",width:"140px"}}src={telelogo} alt="logo" className={styles["logo-img"]} />
              </Link>
            </li>

            <li className={styles["nav__list-item"]}>
              <img style={{height:"30px",paddingRight:"15px"}}src={home} alt="" />
              {isLanguageEnglish ? "About" : "About"}
              <ul className={styles["nav__list-item-drop"]}>
                <li>{isLanguageEnglish ? "How it works" : "N?? ho???t ?????ng nh?? th??? n??o"} </li>
                <li>{isLanguageEnglish ? "Ways to play" : "C??ch ch??i"}</li>
              </ul>
            </li>
            <li className={styles["nav__list-item"]}>
              <img style={{height:"30px",paddingRight:"15px"}}src={education} alt="" />
              {isLanguageEnglish ? "Study" : "H???c"}
              <ul className={styles["nav__list-item-drop"]}>
                <li>
                  <Link to="/quizes">
                    {isLanguageEnglish ? "Public quizes" : "C??u ????? c??ng khai"}
                  </Link>
                </li>
                <li>{isLanguageEnglish ? "Test game" : "Ki???m tra tr?? ch??i"}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles["menu-left"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-item"]}>
              <img style={{height:"30px"}}src={contact} alt="" />
              {isLanguageEnglish ? "Contact" : "Li??n H???"}
            </li>

            {user ? (
              <>
                  <li className={styles["nav__list-item"]}>
                  <Link to="/games/joingame">
                    {isLanguageEnglish ? "Play" : "Ch??i"}
                  </Link>
                </li>
                {user.result.userType === "Teacher" && (
                  <li className={styles["nav__list-item"]}>
                    <Link to="/myquizes">
                      {isLanguageEnglish ? "My Quizes" : "C??u ????? c???a t??i"}
                    </Link>
                  </li>
                )}
                <li className={styles["nav__list-item"]}>
                  {user.result.firstName}
                </li>
                <li onClick={logout} className={styles["nav__list-item"]}>
                  {isLanguageEnglish ? "Log out" : "????ng xu???t"}
                </li>
              </>
            ) : (
              <Link to="/auth" className={styles["nav__list-item"]}>
                <img style={{height:"30px"}}src={login} alt="" />
                {isLanguageEnglish ? "Log in" : "????ng nh???p"}
              </Link>
            )}
            <li className={styles["nav__list-item"]}>
              <img src={globe} alt="" />
              {isLanguageEnglish ? "EN" : "VI"}
              <ul className={styles["nav__list-item-drop"]}>
                <li
                  onClick={() => {
                    dispatch(changeLanguage(!isLanguageEnglish))
                  }}
                >
                  {isLanguageEnglish ? "Ti???ng Vi???t" : "English"}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
