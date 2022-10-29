import './App.scss'
import SearchWord from './SearchWord'
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
	const [result, setResult] = useState(false)

	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={<SearchWord result={result} setResult={setResult} />}
				/>
				<Route
					path='/search'
					element={<SearchWord result={result} setResult={setResult} />}
				/>
				<Route
					path='/result'
					element={
						<div class='result'>
							{result
								? result.map(function (item, i) {
										return (
											<div class='result_item' key={i}>
												{item}
											</div>
										)
								  })
								: null}
						</div>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
