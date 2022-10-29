import './App.scss'

import { text } from './text.js'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
function SearchWord({ result, setResult }) {
	const cookies = new Cookies()
	const [value, setValue] = useState('')
	const [error, setError] = useState(false)
	useEffect(() => {
		setValue(cookies.get('words'))
	}, [])

	const navigate = useNavigate()
	function ReadFile() {
		return text
			.replace(/(\r\n|\n|\r)/gm, '')
			.replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
			.split('|')
	}

	let fragments = ReadFile()

	function SearchExamples(fragments, words) {
		return fragments.filter(fragment => {
			let isExample = 0
			for (let i = 0; i < words.length; i++) {
				if (fragment.includes(words[i])) {
					isExample++
				}
			}

			if (isExample == words.length) {
				return true
			}
		})
	}

	const wordRef = React.useRef()
	const numberExamplesRef = React.useRef()
	let examples

	const handleSubmit = event => {
		event.preventDefault()
		const word = wordRef.current.value.split(' ')
		const numberExamples = numberExamplesRef.current.value
		cookies.set('words', word.join(' '), { path: '/' })
		examples = SearchExamples(fragments, word)
		if (examples.length == 0) {
			setError(true)
		} else {
			examples.length = numberExamples
			setResult(examples)
			navigate('/result')
		}
	}

	return (
		<div className='content' onSubmit={handleSubmit}>
			<form>
				<div className='search'>
					<div class='form__group field'>
						<h2>Введите слово для поиска</h2>
						<input
							type='input'
							class='form__field'
							placeholder='Word'
							name='word'
							id='word'
							ref={wordRef}
							value={value}
							onChange={e => setValue(e.target.value)}
							required
						/>
					</div>
				</div>

				<div className='search'>
					<div class='form__group field'>
						<h2>Количество примеров</h2>
						<input
							type='input'
							class='form__field'
							placeholder='Number Examples'
							name='numberExamples'
							id='numberExamples'
							ref={numberExamplesRef}
							required
						/>
					</div>
				</div>
				{error && <div class='error'>Ничего не найдено! </div>}
				<div>
					<button type='submit'>Отправить</button>
				</div>
			</form>
		</div>
	)
}
export default SearchWord
