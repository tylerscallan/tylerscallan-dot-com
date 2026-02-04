import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorBoundary from '@/components/layouts/ErrorBoundary'
import { installLocationMock, type LocationMockResult } from '../../helpers/mocks'

const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>Child content</div>
}

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>
  let locationMock: LocationMockResult

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    locationMock = installLocationMock()
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  describe('rendering', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>Test child</div>
        </ErrorBoundary>
      )

      expect(screen.getByText('Test child')).toBeInTheDocument()
    })

    it('renders default fallback UI when an error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(
        screen.getByText('We encountered an unexpected error. Please try refreshing the page.')
      ).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument()
    })

    it('renders custom fallback when provided', () => {
      render(
        <ErrorBoundary fallback={<div>Custom error UI</div>}>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Custom error UI')).toBeInTheDocument()
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
    })
  })

  describe('error logging', () => {
    it('logs error to console when error is caught', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('recovery', () => {
    it('reloads page when refresh button is clicked', async () => {
      const user = userEvent.setup()

      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      )

      const refreshButton = screen.getByRole('button', { name: /refresh page/i })
      await user.click(refreshButton)

      expect(locationMock.reload).toHaveBeenCalled()
    })
  })
})
