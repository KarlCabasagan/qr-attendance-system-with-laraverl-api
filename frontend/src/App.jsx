/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react'
import Authentication from './Authentication'
import Dashboard from './Dashboard'
import ModalOverlay from './ModalOverlay'

// Modal Contexts
export const IsModalOnContext = createContext(false)
export const ModalIdContext = createContext(1)

export const SelectedNavBtnContext = createContext(1)

export const TokenContext = createContext(null)
export const UserContext = createContext(null)
export const IsLoggedInContext = createContext(false)

export const SelectedSubjectContext = createContext(null)

export const NextSubjectsContext = createContext(null)
export const CurrentSubjectContext = createContext(null)
export const UserSubjectsContext = createContext(null)

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')))
  const [userRole, setUserRole] = useState(null)

  const [nextSubjects, setNextSubjects] = useState(null)
  const [currentSubject, setCurrentSubject] = useState(null)
  const [userSubjects, setUserSubjects] = useState(null)

  const [selectedSubject, setSelectedSubject] = useState(null)

  const [selectedNavBtn, setSelectedNavBtn] = useState(1)

  // Modal States
  const [isModalOn, setIsModalOn] = useState(false)
  const [modalId, setModalId] = useState(1)

  const resetSessionState = () => {
    setUser(null)
    setIsLoggedIn(false)
    setUserRole(null)
    setCurrentSubject(null)
    setNextSubjects(null)
    setUserSubjects(null)
    setSelectedSubject(null)
    setSelectedNavBtn(1)
    setIsModalOn(false)
    setModalId(1)
  }

  const clearSession = () => {
    localStorage.removeItem('token')
    setToken(null)
    resetSessionState()
  }

  const getUser = async (isCancelled) => {
    if (!token) {
      return false
    }

    try {
      const res = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (isCancelled?.()) {
        return false
      }

      if (res.status === 401) {
        clearSession()
        return false
      }

      if (!res.ok) {
        return false
      }

      const data = await res.json()

      if (isCancelled?.()) {
        return false
      }

      const valid = Boolean(data?.id)
      setUser(data)
      setIsLoggedIn(valid)
      setUserRole(valid ? data.role_id : null)
      return valid
    } catch {
      // Keep existing state on transient network errors
      return false
    }
  }

  const getUserSubjects = async (id, isCancelled) => {
    if (!id || !token) {
      return
    }

    try {
      const res = await fetch(`/api/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok || isCancelled?.()) {
        return
      }

      const data = await res.json()

      if (isCancelled?.()) {
        return
      }

      if (Array.isArray(data)) {
        setCurrentSubject(data[0] ?? null)
        setNextSubjects(data[1] ?? [])
        setUserSubjects(data[2] ?? [])
      }
    } catch {
      // Keep existing subjects on transient network errors
    }
  }

  useEffect(() => {
    if (!token) {
      resetSessionState()
      return
    }

    let cancelled = false
    setIsLoggedIn(true)
    getUser(() => cancelled)

    return () => {
      cancelled = true
    }
  }, [token])

  useEffect(() => {
    if (!user?.id || !isLoggedIn) {
      return
    }

    let cancelled = false
    getUserSubjects(user.id, () => cancelled)

    const intervalId = setInterval(async () => {
      if (cancelled || !isLoggedIn) {
        return
      }

      const ok = await getUser(() => cancelled)
      if (!cancelled && ok) {
        await getUserSubjects(user.id, () => cancelled)
      }
    }, 2000)

    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [user?.id, isLoggedIn, token])

  return (
    <UserSubjectsContext.Provider value={[userSubjects, setUserSubjects]}>
      <CurrentSubjectContext.Provider value={[currentSubject, setCurrentSubject]}>
        <NextSubjectsContext.Provider value={[nextSubjects, setNextSubjects]}>
          <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
            <SelectedSubjectContext.Provider value={[selectedSubject, setSelectedSubject]}>
              <UserContext.Provider value={[user, setUser]}>
                <TokenContext.Provider value={[token, setToken]}>
                  <IsModalOnContext.Provider value={[isModalOn, setIsModalOn]}>
                    <ModalIdContext.Provider value={[modalId, setModalId]}>
                      <SelectedNavBtnContext.Provider value={[selectedNavBtn, setSelectedNavBtn]}>
                        <div className="min-h-[100dvh] w-full bg-surface-canvas text-slate-900 flex flex-col relative">
                          {isModalOn && (
                            <ModalOverlay
                              isModalOn={isModalOn}
                              modalId={modalId}
                              user={user}
                              nextSubjects={nextSubjects}
                              currentSubject={currentSubject}
                              subject={selectedSubject}
                            />
                          )}
                          {isLoggedIn ? (
                            <Dashboard
                              userRole={userRole}
                              navBtn={selectedNavBtn}
                              isLoggedIn={isLoggedIn}
                              user={user}
                              userSubjects={userSubjects}
                              currentSubject={currentSubject}
                            />
                          ) : (
                            <Authentication isLoggedIn={isLoggedIn} />
                          )}
                        </div>
                      </SelectedNavBtnContext.Provider>
                    </ModalIdContext.Provider>
                  </IsModalOnContext.Provider>
                </TokenContext.Provider>
              </UserContext.Provider>
            </SelectedSubjectContext.Provider>
          </IsLoggedInContext.Provider>
        </NextSubjectsContext.Provider>
      </CurrentSubjectContext.Provider>
    </UserSubjectsContext.Provider>
  )
}

export default App
