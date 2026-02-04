import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  describe('basic merging', () => {
    it('merges multiple class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('handles single class name', () => {
      expect(cn('foo')).toBe('foo')
    })

    it('handles empty input', () => {
      expect(cn()).toBe('')
    })
  })

  describe('conditional classes', () => {
    it('includes classes with truthy conditions', () => {
      const shouldInclude = true
      expect(cn('base', shouldInclude && 'included')).toBe('base included')
    })

    it('excludes classes with falsy conditions', () => {
      const shouldExclude = false
      expect(cn('base', shouldExclude && 'excluded')).toBe('base')
    })

    it('handles mixed truthy and falsy conditions', () => {
      expect(cn('base', true && 'yes', false && 'no', 'end')).toBe('base yes end')
    })
  })

  describe('falsy value handling', () => {
    it('ignores undefined values', () => {
      expect(cn('base', undefined, 'end')).toBe('base end')
    })

    it('ignores null values', () => {
      expect(cn('base', null, 'end')).toBe('base end')
    })

    it('ignores false values', () => {
      expect(cn('base', false, 'end')).toBe('base end')
    })

    it('ignores numeric zero (treated as falsy by clsx)', () => {
      expect(cn('base', 0, 'end')).toBe('base end')
    })

    it('ignores empty string values', () => {
      expect(cn('base', '', 'end')).toBe('base end')
    })

    it('handles multiple falsy values together', () => {
      expect(cn('base', undefined, null, false, '', 'end')).toBe('base end')
    })
  })

  describe('array handling', () => {
    it('handles arrays of classes', () => {
      expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('handles nested arrays', () => {
      expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
    })

    it('handles deeply nested arrays', () => {
      expect(cn(['a', ['b', ['c', ['d']]]])).toBe('a b c d')
    })

    it('handles arrays with falsy values', () => {
      expect(cn(['foo', null, 'bar', undefined])).toBe('foo bar')
    })

    it('handles empty arrays', () => {
      expect(cn([], 'foo')).toBe('foo')
    })
  })

  describe('object handling', () => {
    it('includes keys with truthy values', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('handles all truthy values', () => {
      expect(cn({ foo: true, bar: 1, baz: 'yes' })).toBe('foo bar baz')
    })

    it('handles all falsy values', () => {
      expect(cn({ foo: false, bar: null, baz: undefined })).toBe('')
    })

    it('handles empty objects', () => {
      expect(cn({}, 'foo')).toBe('foo')
    })
  })

  describe('Tailwind class merging', () => {
    it('merges Tailwind padding classes correctly', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    })

    it('prioritizes later classes over earlier ones', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    })

    it('merges conflicting Tailwind utilities', () => {
      expect(cn('mt-2', 'mt-4')).toBe('mt-4')
    })

    it('preserves non-conflicting utilities', () => {
      expect(cn('mt-2 mb-2', 'ml-4')).toBe('mt-2 mb-2 ml-4')
    })

    it('handles responsive prefixes', () => {
      expect(cn('md:text-red-500', 'md:text-blue-500')).toBe('md:text-blue-500')
    })
  })

  describe('special characters and edge cases', () => {
    it('handles class names with hyphens', () => {
      expect(cn('my-class-name', 'another-class')).toBe('my-class-name another-class')
    })

    it('handles class names with underscores', () => {
      expect(cn('my_class', 'another_class')).toBe('my_class another_class')
    })

    it('handles class names with colons (Tailwind modifiers)', () => {
      expect(cn('hover:bg-blue-500', 'focus:ring-2')).toBe('hover:bg-blue-500 focus:ring-2')
    })

    it('handles class names with slashes (Tailwind arbitrary values)', () => {
      expect(cn('w-1/2', 'h-1/3')).toBe('w-1/2 h-1/3')
    })

    it('handles class names with brackets (Tailwind arbitrary values)', () => {
      expect(cn('w-[100px]', 'h-[50px]')).toBe('w-[100px] h-[50px]')
    })

    it('handles whitespace-only strings', () => {
      expect(cn('foo', '   ', 'bar')).toBe('foo bar')
    })

    it('handles class names with multiple spaces (normalizes)', () => {
      expect(cn('foo  bar', 'baz')).toBe('foo bar baz')
    })
  })

  describe('complex combinations', () => {
    it('handles mix of strings, arrays, and objects', () => {
      expect(
        cn('base', ['array-class'], { 'object-class': true, ignored: false }, 'final')
      ).toBe('base array-class object-class final')
    })

    it('handles real-world component styling pattern', () => {
      const isActive = true
      const isDisabled = false
      const size = 'large' as 'small' | 'large'

      expect(
        cn(
          'btn',
          isActive && 'btn-active',
          isDisabled && 'btn-disabled',
          size === 'large' && 'btn-lg',
          size === 'small' && 'btn-sm'
        )
      ).toBe('btn btn-active btn-lg')
    })
  })
})
