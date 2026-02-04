import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, ErrorBoundary, PageLoader } from './components'
import { ROUTES } from './config/routes'

// Lazy load all pages
const HomePage = lazy(() => import('./pages/HomePage'))
const EditorialsPage = lazy(() => import('./pages/EditorialsPage'))
const EditorialDetailPage = lazy(() => import('./pages/EditorialDetailPage'))
const SoftwarePage = lazy(() => import('./pages/SoftwarePage'))
const SoftwareDetailPage = lazy(() => import('./pages/SoftwareDetailPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ConnectPage = lazy(() => import('./pages/ConnectPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home} element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.editorials.slice(1)}
              element={
                <Suspense fallback={<PageLoader />}>
                  <EditorialsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.editorialDetail.slice(1)}
              element={
                <Suspense fallback={<PageLoader />}>
                  <EditorialDetailPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.software.slice(1)}
              element={
                <Suspense fallback={<PageLoader />}>
                  <SoftwarePage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.softwareDetail.slice(1)}
              element={
                <Suspense fallback={<PageLoader />}>
                  <SoftwareDetailPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.about.slice(1)}
              element={
                <Suspense fallback={<PageLoader />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.connect.slice(1)}
              element={
                <Suspense fallback={<PageLoader />}>
                  <ConnectPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
