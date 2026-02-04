import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { installMatchMediaMock, type MatchMediaMockResult } from '../helpers/mocks'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

describe('useReducedMotion', () => {
  let mockMedia: MatchMediaMockResult

  afterEach(() => {
    mockMedia.listeners.clear()
  })

  describe('initial state', () => {
    it('returns true when user prefers reduced motion', () => {
      mockMedia = installMatchMediaMock({
        matches: (query) => query === REDUCED_MOTION_QUERY,
      })

      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(true)
    })

    it('returns false when user has no motion preference', () => {
      mockMedia = installMatchMediaMock({ matches: false })

      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(false)
    })
  })

  describe('media query usage', () => {
    it('queries the correct prefers-reduced-motion media feature', () => {
      mockMedia = installMatchMediaMock({ matches: false })

      renderHook(() => useReducedMotion())

      expect(mockMedia.matchMedia).toHaveBeenCalledWith(REDUCED_MOTION_QUERY)
    })
  })

  describe('preference changes', () => {
    beforeEach(() => {
      mockMedia = installMatchMediaMock({ matches: false })
    })

    it('updates when reduced motion preference is enabled', () => {
      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(false)

      act(() => {
        mockMedia.triggerChange(REDUCED_MOTION_QUERY, true)
      })

      expect(result.current).toBe(true)
    })

    it('updates when reduced motion preference is disabled', () => {
      mockMedia = installMatchMediaMock({
        matches: (query) => query === REDUCED_MOTION_QUERY,
      })

      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(true)

      act(() => {
        mockMedia.triggerChange(REDUCED_MOTION_QUERY, false)
      })

      expect(result.current).toBe(false)
    })
  })

  describe('cleanup', () => {
    beforeEach(() => {
      mockMedia = installMatchMediaMock({ matches: false })
    })

    it('removes event listener on unmount', () => {
      const { unmount } = renderHook(() => useReducedMotion())

      expect(mockMedia.listeners.has(REDUCED_MOTION_QUERY)).toBe(true)

      unmount()

      expect(mockMedia.listeners.has(REDUCED_MOTION_QUERY)).toBe(false)
    })

    it('does not trigger state updates after unmount', () => {
      const { result, unmount } = renderHook(() => useReducedMotion())
      const valueBefore = result.current

      unmount()

      // Triggering change after unmount should not cause errors
      act(() => {
        mockMedia.triggerChange(REDUCED_MOTION_QUERY, !valueBefore)
      })

      // Value should remain unchanged (no state update occurred)
      expect(result.current).toBe(valueBefore)
    })
  })
})
