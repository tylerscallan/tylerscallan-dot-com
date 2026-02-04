import '@testing-library/jest-dom/vitest'
import { installMatchMediaMock, installLocationMock } from './helpers/mocks'

// Mock matchMedia for hooks that use media queries
// Individual tests can override by calling installMatchMediaMock() with custom options
installMatchMediaMock()

// Mock window.location for components that use navigation
// Individual tests can override by calling installLocationMock() with custom options
installLocationMock()
