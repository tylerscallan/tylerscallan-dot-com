import { vi } from 'vitest'

export interface MatchMediaMockOptions {
  /** Default match state, or a function that determines match based on query string */
  matches?: boolean | ((query: string) => boolean)
}

export interface MatchMediaMockResult {
  /** Map of query strings to their change event listeners */
  listeners: Map<string, ((event: MediaQueryListEvent) => void)[]>
  /** Trigger a media query change event */
  triggerChange: (query: string, matches: boolean) => void
  /** The mock function for window.matchMedia */
  matchMedia: typeof window.matchMedia
}

/**
 * Creates a mock for window.matchMedia that tracks listeners and allows triggering changes.
 */
export function createMatchMediaMock(
  options: MatchMediaMockOptions = {}
): MatchMediaMockResult {
  const { matches = false } = options
  const listeners = new Map<string, ((event: MediaQueryListEvent) => void)[]>()

  const getMatches = (query: string): boolean => {
    return typeof matches === 'function' ? matches(query) : matches
  }

  const matchMedia = vi.fn((query: string): MediaQueryList => ({
    matches: getMatches(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: string, handler: EventListenerOrEventListenerObject) => {
      const existing = listeners.get(query) ?? []
      listeners.set(query, [...existing, handler as (event: MediaQueryListEvent) => void])
    }),
    removeEventListener: vi.fn((_event: string, handler: EventListenerOrEventListenerObject) => {
      const existing = listeners.get(query) ?? []
      listeners.set(
        query,
        existing.filter((h) => h !== handler)
      )
      if (listeners.get(query)?.length === 0) {
        listeners.delete(query)
      }
    }),
    dispatchEvent: vi.fn(() => true),
  }))

  const triggerChange = (query: string, newMatches: boolean): void => {
    const handlers = listeners.get(query) ?? []
    handlers.forEach((handler) => {
      handler({ matches: newMatches } as MediaQueryListEvent)
    })
  }

  return { listeners, triggerChange, matchMedia }
}

/**
 * Installs the matchMedia mock on the window object.
 */
export function installMatchMediaMock(options: MatchMediaMockOptions = {}): MatchMediaMockResult {
  const mock = createMatchMediaMock(options)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mock.matchMedia,
  })
  return mock
}

export interface LocationMockOptions {
  href?: string
  pathname?: string
  search?: string
  hash?: string
  origin?: string
  protocol?: string
  host?: string
  hostname?: string
  port?: string
}

export interface LocationMockResult {
  reload: ReturnType<typeof vi.fn>
  assign: ReturnType<typeof vi.fn>
  replace: ReturnType<typeof vi.fn>
  location: Location
}

/**
 * Creates a mock for window.location with stubbed navigation methods.
 */
export function createLocationMock(
  options: LocationMockOptions = {}
): LocationMockResult {
  const {
    href = 'http://localhost:3000/',
    pathname = '/',
    search = '',
    hash = '',
    origin = 'http://localhost:3000',
    protocol = 'http:',
    host = 'localhost:3000',
    hostname = 'localhost',
    port = '3000',
  } = options

  const reload = vi.fn()
  const assign = vi.fn()
  const replace = vi.fn()

  const location = {
    href,
    pathname,
    search,
    hash,
    origin,
    protocol,
    host,
    hostname,
    port,
    reload,
    assign,
    replace,
    ancestorOrigins: {} as DOMStringList,
    toString: () => href,
  } as Location

  return { reload, assign, replace, location }
}

/**
 * Installs the location mock on the window object.
 */
export function installLocationMock(options: LocationMockOptions = {}): LocationMockResult {
  const mock = createLocationMock(options)
  Object.defineProperty(window, 'location', {
    writable: true,
    value: mock.location,
  })
  return mock
}
