import React from 'react'
import "./css/LoadingScreen.css"

const LoadingScreen = () => {
  return (
    <>
    <div className='overlay absolute top-0 left-0 h-full w-full'></div>
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
	    <div className="wheel"></div>
	    <div className="hamster">
		    <div className="hamster__body">
			    <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
			    </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
		    </div>
	    </div>
	    <div className="spoke"></div>
    </div>
    </>
  )
}

export default LoadingScreen;