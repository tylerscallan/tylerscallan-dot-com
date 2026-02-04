import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { installMatchMediaMock, type MatchMediaMockResult } from '../helpers/mocks'

// Common breakpoint queries
const BREAKPOINT_MD = '(min-width: 768px)'
const BREAKPOINT_LG = '(min-width: 1024px)'

describe('useMediaQuery', () => {
  let mockMedia: MatchMediaMockResult

  beforeEach(() => {
    mockMedia = installMatchMediaMock({ matches: false })
  })

  afterEach(() => {
    mockMedia.listeners.clear()
  })

  describe('initial state', () => {
    it('returns false when query does not match', () => {
      const { result } = renderHook(() => useMediaQuery(BREAKPOINT_MD))
      expect(result.current).toBe(false)
    })

    it('returns true when query matches', () => {
      mockMedia = installMatchMediaMock({
        matches: (query) => query === BREAKPOINT_MD,
      })

      const { result } = renderHook(() => useMediaQuery(BREAKPOINT_MD))
      expect(result.current).toBe(true)
    })
  })

  describe('dynamic updates', () => {
    it('updates when media query match state changes', () => {
      const { result } = renderHook(() => useMediaQuery(BREAKPOINT_MD))
      expect(result.current).toBe(false)

      act(() => {
        mockMedia.triggerChange(BREAKPOINT_MD, true)
      })

      expect(result.current).toBe(true)
    })

    it('handles query prop changes', () => {
      mockMedia = installMatchMediaMock({
        matches: (query) => query === BREAKPOINT_LG,
      })

      const { result, rerender } = renderHook(({ query }) => useMediaQuery(query), {
        initialProps: { query: BREAKPOINT_MD },
      })

      expect(result.current).toBe(false)

      rerender({ query: BREAKPOINT_LG })

      expect(result.current).toBe(true)
    })
  })

  describe('cleanup', () => {
    it('removes listener on unmount', () => {
      const { unmount } = renderHook(() => useMediaQuery(BREAKPOINT_MD))

      expect(mockMedia.listeners.has(BREAKPOINT_MD)).toBe(true)

      unmount()

      expect(mockMedia.listeners.has(BREAKPOINT_MD)).toBe(false)
    })

    it('removes old listener when query changes', () => {
      const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
        initialProps: { query: BREAKPOINT_MD },
      })

      expect(mockMedia.listeners.has(BREAKPOINT_MD)).toBe(true)

      rerender({ query: BREAKPOINT_LG })

      expect(mockMedia.listeners.has(BREAKPOINT_MD)).toBe(false)
      expect(mockMedia.listeners.has(BREAKPOINT_LG)).toBe(true)
    })
  })

  describe('multiple simultaneous queries', () => {
    it('tracks listeners independently for different queries', () => {
      const { unmount: unmountMd } = renderHook(() => useMediaQuery(BREAKPOINT_MD))
      const { unmount: unmountLg } = renderHook(() => useMediaQuery(BREAKPOINT_LG))

      expect(mockMedia.listeners.has(BREAKPOINT_MD)).toBe(true)
      expect(mockMedia.listeners.has(BREAKPOINT_LG)).toBe(true)

      unmountMd()

      expect(mockMedia.listeners.has(BREAKPOINT_MD)).toBe(false)
      expect(mockMedia.listeners.has(BREAKPOINT_LG)).toBe(true)

      unmountLg()

      expect(mockMedia.listeners.has(BREAKPOINT_LG)).toBe(false)
    })

    it('supports multiple hooks with the same query', () => {
      const { result: result1 } = renderHook(() => useMediaQuery(BREAKPOINT_MD))
      const { result: result2 } = renderHook(() => useMediaQuery(BREAKPOINT_MD))

      expect(result1.current).toBe(false)
      expect(result2.current).toBe(false)

      act(() => {
        mockMedia.triggerChange(BREAKPOINT_MD, true)
      })

      expect(result1.current).toBe(true)
      expect(result2.current).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('handles empty query string', () => {
      const { result } = renderHook(() => useMediaQuery(''))
      // Empty queries should still work (return false from mock)
      expect(result.current).toBe(false)
    })

    it('handles complex query strings', () => {
      const complexQuery = '(min-width: 768px) and (max-width: 1024px)'
      mockMedia = installMatchMediaMock({
        matches: (query) => query === complexQuery,
      })

      const { result } = renderHook(() => useMediaQuery(complexQuery))
      expect(result.current).toBe(true)
    })

    it('handles query with special characters', () => {
      const queryWithSpecialChars = "(orientation: portrait) and (hover: none)"
      const { result } = renderHook(() => useMediaQuery(queryWithSpecialChars))
      expect(result.current).toBe(false)
    })
  })
})
