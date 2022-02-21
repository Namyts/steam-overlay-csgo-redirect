import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import classes from './App.module.css'

const parseLink = (link) => {
	if(true){}
	return {}
}

const App = () => {
	//example link: https://steamcommunity.com/id/jamesstyman/

	const DEBUG_MODE = true
	const goToSite = (url,options={}) => {
		console.log(`going to: ${url}`)
		!options.debug && window.location.replace(url)
	}

	useEffect(()=>{
		if(!navigator.clipboard){return}
		return navigator.clipboard.readText()
		.then(clipboardText=>{
			console.log(`clipboard: ${clipboardText}`)
			const linkInfo = parseLink(clipboardText)

			if(linkInfo){
				if(linkInfo.id){
					goToSite(`https://csgostats.gg/player/${linkInfo.id}`,{debug: DEBUG_MODE})
				} else {
					goToSite(`https://csgostats.gg`,{debug: DEBUG_MODE})
				}				
			} else {
				goToSite('https://www.google.com',{debug: DEBUG_MODE})
			}
		})
		.catch(err=>console.error(err))
	})

	return (
		<div className={classes["root"]}>
			{navigator.clipboard ? `Redirecting...` : `Browser can't read clipboard`}
		</div>
	)
}
export default App