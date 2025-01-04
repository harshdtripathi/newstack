import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../utils/constants';
import toast from 'react-hot-toast';
import { addToCart } from '../../slices/cartSlice';

const AddCart = ({ course }) => {
  const { cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);

  
  const Addtocart = () => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in",
        text2: "Please login to add the course to your cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("As an instructor, you cannot purchase courses.");
      return;
    }

   


    dispatch(addToCart( course )); // Pass course details to the action
  
  };

  return (
    <div className='w-full rounded-lg'>
      <button
        onClick={Addtocart}
        className="bg-yellow-100 text-black font-inter p-2 w-full rounded-md hover:bg-richBlack-500"
      >
        Add to Cart
      </button>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default AddCart;
