import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import classes from './App.module.css'

RegExp.quote = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")

const parseLink = (link) => {
	//examples: https://steamcommunity.com/id/jamesstyman/
	//or: https://steamcommunity.com/profiles/76561199072322454
	//or: 76561199072322454
	//note: Vanity links arent resolved to profile id because I dont want to use the steam api for this

	const matchLink = link.match(`.*steamcommunity.com/(.*)/(.*)`)
	const matchNumber = link.match(/\d{17}/)
	
	console.log(matchLink)
	if(matchLink){
		const profileType = matchLink[1]
		if(profileType === 'profiles'){
			return {id: matchLink[2]}
		} else {
			return {id: null}
		}
	}

	console.log(matchNumber)
	if(matchNumber){ return {id: matchNumber[0]} }

	return null
}

const App = () => {
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
