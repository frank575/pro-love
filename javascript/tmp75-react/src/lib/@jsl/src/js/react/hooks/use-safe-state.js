/// 防止內存洩漏的 useState
/// v1 {author: frank575} parameter改名_state->initialState
/// v0 {author: frank575}

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * @template T
 * @param {T} initialState
 * @returns [T, function(T | function(T): *): void]
 */
export const useSafeState = initialState => {
	const _isMounted = useRef(true)
	const [state, setState] = useState(initialState)
	const updateState = useCallback(update => {
		if (_isMounted.current) {
			setState(update)
		}
	}, [])
	useEffect(() => {
		return () => {
			_isMounted.current = false
		}
	}, [])
	return [state, updateState]
}
