import React from 'react'
import Loginf from '../Components/auth/Loginf'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='flex flex-row gap-5 lg:mr-0 mr-10  '>
            <div className='lg:w-[80%] w-full  flex flex-col relative '>
                <div className='flex flex-row gap-3 items-center  lg:translate-x-36 translate-x-14 absolute lg:mt-[12%] mt-[40%] text-2xl font-inter  '>
                    Create Account ?
                    <Link to="/signup">
                        <button className="text-yellow-50 hover:bg-transparent text-[60%]">
                            Sign Up
                        </button>
                    </Link>
                </div>

                <Loginf>


                </Loginf>
            </div>

        </div>
    )
}

export default Login
