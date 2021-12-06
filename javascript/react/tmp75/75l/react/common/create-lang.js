import { useCallback, useMemo, useState } from 'react'
import { createProvider } from './create-provider'

// 將 {0, 1, ...} 值轉換
const t = (text, replaceArgs = []) => {
	if (!text) return text
	if (Array.isArray(replaceArgs) && replaceArgs.length > 0) {
		let parsedText = text
		for (let i = 0; i < replaceArgs.length; i++) {
			parsedText = parsedText.replace(new RegExp(`\\{${i}\\}`, 'g'), e)
		}
	}
	return text
}

const useService =
	({ defaultLocale, languages, langRef }) =>
	() => {
		const [locale, setLocale] = useState(defaultLocale)
		const lang = useMemo(() => languages[locale] || {}, [locale])
		const changeLocale = useCallback(
			plocale => {
				langRef.current = languages[plocale] || {}
				setLocale(plocale)
			},
			[languages, langRef, setLocale],
		)

		return {
			lang,
			locale,
			changeLocale,
		}
	}

export const createLang = ({
	defaultLocale,
	languages: plangauges,
	typeBindObj,
} = {}) => {
	const languages = plangauges || {}
	for (let key in languages) {
		languages[key].$t = t
	}

	let langRef = { current: languages[defaultLocale] || {} }

	return {
		lang: langRef.current,
		...createProvider(useService({ defaultLocale, languages, langRef })),
	}
}
