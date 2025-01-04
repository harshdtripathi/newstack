import React from 'react'
import ChangeProfilePicture from "../Settings/ChangeProfilePicture"
import ProfileInformation from './ProfileInformation'
import DeleteAccount from './DeleteAccount'

const Settingitems = () => {
  return (
    <div className='flex flex-col font-inter text-white w-11/12 '>
       <h2 className='text-4xl'>Edit Profile</h2>

            
       <ChangeProfilePicture></ChangeProfilePicture>

       <ProfileInformation></ProfileInformation>
       <DeleteAccount></DeleteAccount>


      
    </div>
  )
}

export default Settingitems
