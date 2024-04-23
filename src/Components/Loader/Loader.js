import { Fragment } from 'react'
import './Loader.css'

const Loader = () => {

    return (
        <Fragment>
            <div className="container">
                <div className="cloud front">
                    <span className="left-front"></span>
                    <span className="right-front"></span>
                </div>
                <span className="sun sunshine"></span>
                <span className="sun"></span>
                <div className="cloud back">
                    <span className="left-back"></span>
                    <span className="right-back"></span>
                </div>
            </div>
            <h1 className='text-xl'>If you're stuck on loading</h1>
            <h1 className='text-xl'>Try again with VPN</h1>
        </Fragment>
    )

}

export default Loader